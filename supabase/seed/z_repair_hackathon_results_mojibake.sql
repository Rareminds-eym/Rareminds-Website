-- Repair mojibake (CP437 misencoding) in hackathon result team_name values.
-- The inserts in 5_competition_results_storage.sql contain corrupted
-- character sequences from a bad encoding round-trip -- the same root
-- cause already fixed for recruitment_services. This repair script runs
-- after that seed file (by "./seed/*.sql" filename ordering in
-- supabase/config.toml, "z_" sorts after "5_"), the same way
-- z_repair_recruitment_services_mojibake.sql and
-- z_seed_course_default_image.sql (SkillPassport) repair data after
-- their source seed has already loaded.
--
-- Scope: team_name in gmp_results, gmp_h2_results, mc_results,
-- mc_h2_results, fsqm_results, fsqm_h2_results. Winners tables
-- (gmp_winners, mc_winners, fsqm_winners) were checked and confirmed
-- clean -- not touched here.
--
-- Two kinds of fix, per explicit instruction -- emojis are not
-- recovered, only removed, keeping the surrounding valid text:
--   1. Plain corrupted punctuation -> corrected character
--      (e.g. S┬▓PT -> S²PT, HackΓÇÖnΓÇÖCheese -> Hack'n'Cheese)
--   2. Corrupted emoji/symbol sequence -> removed entirely, valid text
--      kept and trimmed (e.g. "Five starΓ£¿" -> "Five star")
--
-- Two rows are intentionally EXCLUDED and left untouched:
--   - fsqm_results id 2f975003-7a4f-47ff-af53-e3a85afabe40 ("Silent
--     Boys" in stylized Unicode + emoji) -- explicitly excluded.
--   - fsqm_h2_results id 8203a087-d2f2-41cc-9f64-43e65aa12b85 -- even a
--     second decode pass produces no readable text; not guessed at.
--
-- Each UPDATE matches on both the row's current team_name value AND its
-- id, so it only ever touches the exact row it was written for and
-- becomes a safe no-op once that row is fixed (or if it doesn't exist
-- in a given environment) -- safe to run on every reset.

BEGIN;

DO $repair_hackathon_results_mojibake$
BEGIN

  -- gmp_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'gmp_results') THEN
    UPDATE public.gmp_results
    SET team_name = 'S²PT'
    WHERE id = 'd03f15b4-e9da-4289-831c-87f356e6a8c5'
      AND team_name = 'S┬▓PT';
  END IF;

  -- gmp_h2_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'gmp_h2_results') THEN
    UPDATE public.gmp_h2_results
    SET team_name = 'S²PT'
    WHERE id = '4310b956-0037-4b1c-bfb9-e703866d80ca'
      AND team_name = 'S├é┬▓PT';
  END IF;

  -- mc_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'mc_results') THEN
    UPDATE public.mc_results
    SET team_name = 'A²RY'
    WHERE id = '70811a6f-46b1-472a-8165-3122d516aeba'
      AND team_name = 'A┬▓RY';

    UPDATE public.mc_results
    SET team_name = 'Bright Sparks Battle'
    WHERE id = '22e47af9-f058-4b08-83a7-fce342313a07'
      AND team_name = 'Bright Sparks BattleΓ£¿∩╕Å';

    UPDATE public.mc_results
    SET team_name = 'ADENGAPPA 6 PERUU..'
    WHERE id = 'ffc0936a-bb3c-404d-8284-e133febc125c'
      AND team_name = 'ADENGAPPA 6 PERUU..ΓÖí';
  END IF;

  -- mc_h2_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'mc_h2_results') THEN
    UPDATE public.mc_h2_results
    SET team_name = 'KING MAKERS'
    WHERE id = '549533ba-da49-4ac7-a81f-2633a4e89949'
      AND team_name = 'KING MAKERS ├░┼╕ΓÇÿΓÇÿ';

    UPDATE public.mc_h2_results
    SET team_name = 'ADENGAPPA 6 PERUU..'
    WHERE id = '89de28b0-277d-498a-bbc4-c7dc30a5fad3'
      AND team_name = 'ADENGAPPA 6 PERUU..├óΓäó┬í';
  END IF;

  -- fsqm_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fsqm_results') THEN
    UPDATE public.fsqm_results
    SET team_name = 'Hack''n''Cheese'
    WHERE id = 'bd0c83c2-bc20-4c4d-a899-9e6d4e4087c9'
      AND team_name = 'HackΓÇÖnΓÇÖCheese';

    UPDATE public.fsqm_results
    SET team_name = 'Five star'
    WHERE id = 'db51fa2d-5bb7-49bc-b9e8-a5b6e3f455fd'
      AND team_name = 'Five starΓ£¿';

    UPDATE public.fsqm_results
    SET team_name = 'Fairy queens'
    WHERE id = '5ccaab4f-199e-49c7-8597-7d68959c6480'
      AND team_name = 'Γ¥ñ Fairy queens Γ¥ñ';

    UPDATE public.fsqm_results
    SET team_name = 'Botany fire girl''s'
    WHERE id = '808feb61-16bc-4e8a-bd51-2840c145174d'
      AND team_name = 'Botany fire girl''s Γ¥ñ∩╕ÅΓÇì≡ƒöÑ≡ƒî▒Γÿÿ∩╕Å≡ƒìâ';

    -- id 2f975003-7a4f-47ff-af53-e3a85afabe40 ("Silent Boys") is
    -- intentionally excluded -- left untouched per explicit instruction.
  END IF;

  -- fsqm_h2_results
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fsqm_h2_results') THEN
    UPDATE public.fsqm_h2_results
    SET team_name = 'Union of Thoughts'
    WHERE id = 'e4da2947-e473-4a24-85a6-72fd30e59c41'
      AND team_name = 'Union of Thoughts ├░┼╕┬ñΓÇ¥├░┼╕ΓÇÖ┬¡';

    -- id 8203a087-d2f2-41cc-9f64-43e65aa12b85 is intentionally
    -- excluded -- no readable text recoverable, not guessed at.
  END IF;

END;
$repair_hackathon_results_mojibake$;

COMMIT;
