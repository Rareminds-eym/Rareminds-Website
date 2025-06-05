
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "../../Academy/UI/testimonials-column";

const testimonials: Testimonial[] = [

  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokul",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lithishwaran",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ponraman n",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariprasath B",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ragul",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Punitha",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayasri.p",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "m.murugapandi",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Nathiya",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathyamoorthi",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Malini.R",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vithya",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.Anusuya",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishnu",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subhashini",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepak s",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Swetha",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Adhithya A",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G.Ramya",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.swetha",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "p.mahalakshmi",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "m.narmatha",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "suvitha.S",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B.Jansi",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E.akalya",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rosalin.p",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T.priyadharshini",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "L.tamilkodi",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarmila. K",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalaivani.s",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ashika. S",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abirami.s",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthik k",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subash",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Punitha Govindasamy",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sudharsan G",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Meena",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Viknesh",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.nisha",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subhiksha",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithish",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ravivarman",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Ruthran",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarumathi R",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sabari T",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rojit",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sriban I",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abishek",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yaswanth",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohan raj",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prithviraj",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kamesh",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anbarasan",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinesh",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aravinth",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikkam",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharmalingam",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suresh",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aparna",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ishathlli",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Indhumathi",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vennnila",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "vasanthi",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhiya",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B.DINESH kumar",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Guna seakar",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sankar",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lakshmanan",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poovarasu",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "\u00e0\u00ae\u00b0\u00e0\u00af_x008d_. Arunthathi",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V. Sharmila",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elakkiya",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pooja",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Arunkumar",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Reka",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A. Agalya",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "C. Thilagavathi",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Gnanamozi",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "L. Vasanthi",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hinduja",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Monisha",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J. Sharmila",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G.purushothaman",
    role: "GHSS. Orathi, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Malarmathi",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Swathy p",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D. Monisha",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi.s",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shanmuga shree .s",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanusha",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Harini.s",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kokila",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lashmi",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kaviya s",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nimmy christna",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavitha DN",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suresh",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Girija ss",
    role: "CHENNAI GIRLS HSS, SAIDAPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J Deepa Sree",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.Shalini",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M JAYALAKSHMI",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kamali",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Janani",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Evangline",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srimathi.R",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yuvasri",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mallika",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.priyadharshi",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Priydharshini",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.keerthana",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.ashwini",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D Vinitha",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Sharmila",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E Veronika",
    role: "PRESIDENCY GIRLS HSS -MODEL, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A Ragavan",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavibharathi",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E .Elamaran",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ravichanthiran",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sudharsan S",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhivakar.T",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijayaraj",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Raman.B",
    role: "GHSS MEL BHUVANAGIRI BOYS, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathish s",
    role: "GOVERNMENT HR.SEC SCHOOL LALPET, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarukesh s",
    role: "GOVERNMENT HR.SEC SCHOOL LALPET, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B jayasurya",
    role: "GOVERNMENT HR.SEC SCHOOL LALPET, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Anish",
    role: "GOVERNMENT HR.SEC SCHOOL LALPET, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Ragavan",
    role: "GOVERNMENT HR.SEC SCHOOL LALPET, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "L Elanthamaran",
    role: "GOVERNMENT HR.SEC SCHOOL LALPET, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Aakash",
    role: "GOVERNMENT HR.SEC SCHOOL LALPET, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Krutheesh.v",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinoth",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Perarasu",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "surendar",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepan.R",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Stalin",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay V",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mani",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishwa",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mageshwaran.A",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M manoj",
    role: "MUNICIPAL HIGHER SECONDARY SCHOOL - CUDDALORE, CUDDALORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sukumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0bbe\u0b95\u0bb0\u0bae\u0bcd., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Velraj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0bbe\u0b95\u0bb0\u0bae\u0bcd., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manoj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0bbe\u0b95\u0bb0\u0bae\u0bcd., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0bbe\u0b95\u0bb0\u0bae\u0bcd., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sutharsan m",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0bbe\u0b95\u0bb0\u0bae\u0bcd., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Periasamy",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0bbe\u0b95\u0bb0\u0bae\u0bcd., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N.Dhinesh kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lokesh S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthikeyan S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prem Kumar R",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balaji s",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thiruvasan p",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Madhan Kumar k",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tamilalagan M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Purusothaman M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jaipretheepmatha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Musthapa A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "PRAVIN KUMAR S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0bb0\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "DHANUSHYA S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "KOWSIGA G",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "PRIYADHARSHINI S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "PUVITHA V",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ABIRAMAN A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "MUTHAMIZHAN P",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "MUTHUKRISHNAN A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SAKTHIVEL V",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SIVAMANI G",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "MALATHI B",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b9a\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bc1\u0b9f\u0bbf,, DHARMAPURI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M .Devibala",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K.harini",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "NAVEENA M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ELANTAMIL A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K JAYASRI",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "JANANI J",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "PRIYADHARSINI RG",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "GUNAVATHI K",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "INDHUMATHI S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "MUNIRAJ P",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "MEGANATHAN M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SIVAGURU A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bc1\u0bae\u0ba4\u0bcd\u0ba4\u0bc2\u0bb0\u0bcd, Dharmapuri, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ARIVALAGAN G",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "THARUN D",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Siva",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bhagavathi saran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V.vigneshkumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D. Vijayaragavan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.vishnu",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thulasimaneeswaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Krishna.k",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ramachandran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0ba9\u0bcd\u0ba9\u0bbf\u0bb5\u0bbe\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithiesh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0b95\u0bb0\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Durgasarathi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0b95\u0bb0\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Praveen Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0b95\u0bb0\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Naveen kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0b95\u0bb0\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Antony B",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0b95\u0bb0\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "vishal",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0b95\u0bb0\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "I.Juliet raj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0b95\u0bb0\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M vishnu",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Selva Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ashok",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mithilesh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N.chandru",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathya prabha. S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R. Santhosh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Swetha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J Naveen kuumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D. Manikandan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Gowtham",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sam Jeffry A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arun kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Praveen kumar.S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V. Abilash",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijay prakash",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Yalin Savari muthu",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Madasamy",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ducklas",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharani Dharan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nagarja. V",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b8e\u0ba9\u0bcd.\u0baa\u0b9e\u0bcd\u0b9a\u0bae\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kodiarasan S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishore",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishor Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Harish.v",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohan raj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veeraperumal.v",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sridhar. N",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akshaya",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hemalatha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokul",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Mahalakshmi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dinakaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J.roselin",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T. Muzhumathi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vellaithai",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dinesh kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prakash",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A. Kaleeswari",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohana prasath",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohanapriyan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhanapal",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veeraperumal.v",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sandhya",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "swetha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0bbe\u0b9a\u0bbf\u0baa\u0bbe\u0bb3\u0bc8\u0baf\u0bae\u0bcd, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M yuvaraj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hema",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogeshwarn Z",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G.selvaganapathy",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sathish kumar S",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nirubanraj",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohammad ali",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohammad abusali",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhanakumar",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Selvaganapathi",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arunkarthik",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhineshkumar",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Musraf ali",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aaja mydeen",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Viswanathan",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay",
    role: "\u0ba8\u0bc7\u0bb0\u0bc1\u0b9c\u0bbf \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0b9f\u0bc8\u0baf\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Logesh",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ezhumalai.c",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arulmani",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.vignesh",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ranjith",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "venkatasubash.v",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sivasakthi D",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithishvaran M",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vignesh G",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Durai pandi G",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thirupati T",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "vishal k",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "m ranjith",
    role: "GHSS-G.ARIYUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Ezhilarasan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0bcd\u0b95\u0bc1\u0bb4\u0bbf-, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V Jegan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0bcd\u0b95\u0bc1\u0bb4\u0bbf-, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Loganadhan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0bcd\u0b95\u0bc1\u0bb4\u0bbf-, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Kabilan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0bcd\u0b95\u0bc1\u0bb4\u0bbf-, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Arjun",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0bcd\u0b95\u0bc1\u0bb4\u0bbf-, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N Jegathesan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0bcd\u0b95\u0bc1\u0bb4\u0bbf-, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arul selvan",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SanthoshKumar S",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sakthivel R",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "KATHIR M",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thanizhselvan s",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prakashraj A",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gayathri S",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sankar",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aranya s",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anandhi.s",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sushra",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohan",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anusuyam",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "vishnu B",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Patma V",
    role: "GHSS-NAINARPALAYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishal M",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Madhan",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthik deva",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tharun",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vignesh",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Nandhini",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogapriya",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elakkiya R",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowri R",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Keerthana S",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Janani B",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shalini m",
    role: "Government High School -\n  Arachandarthirumalai, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pradeep",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bb2\u0bc8\u0b95\u0bcd\u0b95\u0bcb\u0bb5\u0bbf\u0bb2\u0bc1\u0bb0\u0bcd, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Savin.s",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bb2\u0bc8\u0b95\u0bcd\u0b95\u0bcb\u0bb5\u0bbf\u0bb2\u0bc1\u0bb0\u0bcd, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Deepika",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bb2\u0bc8\u0b95\u0bcd\u0b95\u0bcb\u0bb5\u0bbf\u0bb2\u0bc1\u0bb0\u0bcd, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Kottaiyarasan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bb2\u0bc8\u0b95\u0bcd\u0b95\u0bcb\u0bb5\u0bbf\u0bb2\u0bc1\u0bb0\u0bcd, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manimegalai",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bb2\u0bc8\u0b95\u0bcd\u0b95\u0bcb\u0bb5\u0bbf\u0bb2\u0bc1\u0bb0\u0bcd, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.jayamani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bb2\u0bc8\u0b95\u0bcd\u0b95\u0bcb\u0bb5\u0bbf\u0bb2\u0bc1\u0bb0\u0bcd, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T. Selvan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bb2\u0bc8\u0b95\u0bcd\u0b95\u0bcb\u0bb5\u0bbf\u0bb2\u0bc1\u0bb0\u0bcd, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "MARISH G",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "KAVIVATHANI G",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "DHIVYA V",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "prakash N",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Lavanya",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "MEGALA S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SHALINI S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balasubramani T",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ravichandran.n",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Krishnamoorthy.N",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "HARIHARAN M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ALEXMARUTHANAYAGAM S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjai",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "venkatasubash.v",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Purusothaman M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0bb4\u0bc8\u0baf\u0b9c\u0bc6\u0baf\u0b99\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bae\u0bcd, KARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kottsi karuppan",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bala Mugesh",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sivakumar",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dinesh",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohammed jesran",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J. Abdul rahuman",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ranjith",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sakthivel p",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Eluvi",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sabarigrishan k. G",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vasagan",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kurinji",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veeranan.k",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nagadevi",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vellaikathan",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tamil maran",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85.\u0bb5\u0bb2\u0bcd\u0bb2\u0bbe\u0bb3\u0baa\u0b9f\u0bcd\u0b9f\u0bbf., MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suryaprakash",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kamatchi vasantha Kumar. S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Alageswaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arun Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vairamuthu",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vetri vel",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kannan.s",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mathan kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b85\u0bb2\u0b99\u0bcd\u0b95\u0bbe\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B. Devi",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Alagu thavam",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sangeetha.A",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.vishal",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anitha",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ramesh",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M kanjana",
    role: "GMHSS GUDALUR, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "C.Meenatchi",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Santhiya",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nathiya.A",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.santhosh",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arunpandi",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rohan",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Santhanam",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.santhosh",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.arunkumar",
    role: "GBHSS MANALMEDU, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokul Raj G",
    role: "GHSS NANGUR, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariprakash S",
    role: "GHSS NANGUR, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prem Kumar R",
    role: "GHSS NANGUR, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karan Parath B",
    role: "GHSS NANGUR, MAYILADUTHURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhanakaruppu.m",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "AnnapooraniR",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abishek R",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balas",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ragul R",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dineshu",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishore b",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Iyyappan S",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "JEEVA.N",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ranjithraj .M",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abishek R",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priyatharshini S",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rubini K",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalaiyatharshini k",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suba B",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ANANDHAKRISHNAN",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J. Madhan",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Navaneethan",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.kaviya",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Bavisha",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Sangeetha",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J.sathiya",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Jothika",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijay prakash",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Narsima",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mani",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G.santhiya",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abishek R",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balas",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ragul R",
    role: "GHSS-SEMBODAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Krishnan S",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinaya s",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kowsalya",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vaishnavi K",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "malathi",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shivalini R",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhiya",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kowsalya",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Durai",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahamuni P",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hari Prasath R",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bbe\u0bb0\u0bc8, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muthukumar M",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ranjith p",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hari Prasath R",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.jeeva",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.iyappan",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Logeshwaran.k",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishal R",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hari haran. K",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.Bharanidharan",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhoshkanna",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "NITHISH kumar",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Selvaraj k",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kirubakar SJ",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.hariprasanth",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Barani S",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suresh. S",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Siva P",
    role: "A.M.E.School-Perambalur, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B KISHORE",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E.NIRANJAN",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.SENTHAMILAN",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.AATHAVAN",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A. Anbu selvan",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Monika",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SENTHILKUMAR S",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.KAVIYAZHAGAN",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0baa\u0bcd\u0baa\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf\u0b95\u0bbe\u0b9f\u0bc1, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohanasundaram",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinesh",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kubendran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Govindharaj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarathi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kabilan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithiarasan.M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veeramani.g",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veerakumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R. Santhosh",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Surya G",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N. Alagu",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "GIRIDHARAN S",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saravanan pandi.S",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "DHIVYA S",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ADAIKALAM. C",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Dhashina moorthi",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sharath",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sowmiya",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "catherine",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "aparna",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "deepa",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elakkiya R",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Fathima",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "harini",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ishwarya",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Janani B",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "harini",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ishwarya",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Janani B",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ADAIKALAM. C",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL, ARIMALAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hema",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Monisa",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Gomathi",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhanasundary",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ithaya",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sutha",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Uthra",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Devi",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ponmalar",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "malathi",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "dhanapriya",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "kalaiselvi",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sangeetha",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ranjani",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "mahalakshmi",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,THIRUVARANKULAM, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "soniya",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "madesh",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "balaji",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Varun",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srinivas",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Venkatasubash.v",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subha",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavitra",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jenifer",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rinisha M",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kanishga D",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suvetha",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjeev",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalai",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Rokith",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariharan.M",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Paramasivam",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A. Sivamanikandan",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.karuppaiya",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Elangovan",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Gnanasekaran",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.karuppasamy",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V kirubananthan",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T mohanraj",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL(B) VIRALIMALAI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogalakshmi",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Pothumponnu",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gayathri",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.sukrivan",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Pothumponnu",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Swathi",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sumgala",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sridevi",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vujay",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lawarence",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "katherine",
    role: "GOVT HR SEC SCHOOL MARAMADAKKI, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Iyyanar Pandi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rajesh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarukesh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogeshwaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Shobana",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Thulasika",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K.susmitha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogeshwaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Thulasika",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Shobana",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Karsiga muthumani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R. Sathupriya",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Karsiga muthumani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Shobana",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B. Monika",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prabakaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf , \u0bae\u0bc7\u0bb2\u0bbe\u0baf\u0bcd\u0b95\u0bc1\u0b9f\u0bbf, Ramanathapuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anish S",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dinesh H",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Premkumar A",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Udhaya S",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poovarasan S",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hemakumar K",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "JALAGANDESWARAN J",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jeeva J",
    role: "GHSS K.velur, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priya",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Gowsalya",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kasthuri",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T.charles",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R KaviyaDharshini",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Indhu",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jegan",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavithra",
    role: "GHSS Ariyakudi , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Michael vinciya",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poovendhran.m",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kathir vel",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balaji",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priya dharshini",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogeshwari",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "PandiDurai",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.jayalakshmi",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suyaprakash",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mari Radha lakshmi",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abirami",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rajeshwari",
    role: "GHSS-KOMBUKKARANENDAL, Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mugeshpandi. M",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Palaraman.r",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Murugan.m",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thirumurugan. P",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gurumoorthi.G",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nagendran",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijay",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Murugan. U",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Satheesh",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gopala krishnan M",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Moorthi.R",
    role: "GHSS, PALAYANOOR , Sivagangai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saravanaperumal. B",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K.manikandan",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sakthi saravanan",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Swetha",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ARUN SEGAN M",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "John Peter",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Daniel",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "C.kanishya",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Mathan",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Velmurugan",
    role: "GHSS-UTHUMALAI , TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E Suresh Kumar",
    role: "SMSS.GOVT.BOTYS HR SEC SCHOOL SHENCOTTAI, TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Divagar",
    role: "SMSS.GOVT.BOTYS HR SEC SCHOOL SHENCOTTAI, TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowtham",
    role: "SMSS.GOVT.BOTYS HR SEC SCHOOL SHENCOTTAI, TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Athif",
    role: "SMSS.GOVT.BOTYS HR SEC SCHOOL SHENCOTTAI, TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "subash",
    role: "SMSS.GOVT.BOTYS HR SEC SCHOOL SHENCOTTAI, TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishore R",
    role: "SMSS.GOVT.BOTYS HR SEC SCHOOL SHENCOTTAI, TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V Rahul",
    role: "SMSS.GOVT.BOTYS HR SEC SCHOOL SHENCOTTAI, TENKASI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J.Rajesh",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinothini",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thirisha.c",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SIVABALAN.T",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thaneswaran",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pakkiyaraj",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.suseendran",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sasi Kumar",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suriya.v",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Chandrabose",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.Manimekalai",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "veeramani",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Divakar",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sumithras",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E.jeeva",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subishka s",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N.vignesh",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathiya priya D",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.santhiya",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalaiyarasan",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Atchayalakshmi",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ariyaprakash",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.saravanann",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mageshwaran A",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathiya priya D",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bc7\u0bb2\u0b89\u0bb3\u0bc1\u0bb0\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.Gayathiri",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "s.kaviyarasu",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N. Nikitha sri",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aruna",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Bagiyasri",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B. lishi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Harish",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohana Eswaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ponnaiyan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pragadeeswaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jeeva J",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavin",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sundhar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Kaviyarasu",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prasanna",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veerabahu",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vasanth",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hanisha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elawarasi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srilekha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sneha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b95\u0bb0\u0bae\u0bcd\u0baa\u0baf\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "GANAPATHY",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mukesh priyan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D.VENKATESH",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D.sivaranjani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Anitha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokuleshwaran. P",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M surendhiran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayakumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ramya R",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathya A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavin Kumar.k",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "U rajkumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elavrasan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priyadharshini. J",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Subashini",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.veeraragavan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.Mathavan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Subashini",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priyadharshini. J",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elavarasan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Deepika",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijay",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Atchaya",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0bae\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Samy",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B.logesh",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.shanmugapriya",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V.jeeva",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B.kaviya",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Deiva kumar",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E.Abishek",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Ravi chandran",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.Haribharath",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V.Yoganandhan",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V.Sivasakthivel",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.sujith",
    role: "GOVT HSS-SILAMALAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pandeeswaran",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bhavani P",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayapriya M",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bhuvaneshwari J",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Keerthapriyan",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SANTHIYA. S",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Maheshwaran R",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "DINESH.M",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nandhini N",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kathiresan K",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nitheeswaran S",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathishkumar V",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vetri vishal V",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinith M",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rubith kumar S",
    role: "GOVT HSS, BOOTHIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Alageshwari",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "subalakshmi.v",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anusiya.P",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "swetha.s",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Susimani.R",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ramya.R",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abarna.s",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priyanka.C",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sabitha.M",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Angalaeswari.N",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokilavani.R",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "karthiselvi.A",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Alaguraja.L",
    role: "GOVT HSS, MYLADUMPARAI, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowtham s",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Eswaran",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G.BHARANEEDHARAN",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pevin",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Divakar",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yuvaraja",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N Kumaran",
    role: "GOVT HSS, PANNAIPURAM, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K.dhanesh kumar",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Vijayan",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavibarathi",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijaya ragavi. K",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yamuna. M",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathya",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "RAMAMOORTHY",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kaviyarasi ",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayasudha",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Malathika",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mithra ",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muthazhagi",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suvathi",
    role: "GOVT HSS, PANNAIPURAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavibala. M",
    role: "GOVT MODEL HIGHER SECONDARY SCHOOL, ALLINAGARAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Nanthabalan",
    role: "GOVT MODEL HIGHER SECONDARY SCHOOL, ALLINAGARAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "JEEVA.V",
    role: "GOVT MODEL HIGHER SECONDARY SCHOOL, ALLINAGARAM, THENI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "v Varsha",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "s.manju",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Indu selvi",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. vaisshnavi",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E.Gayathiri Ganthi",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.Vidya",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K.Madhusri",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Uma Bharathi",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.Suvika",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Aruna",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Petchiammal",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Meena",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.Priya Roshini",
    role: "\u0b85.\u0bb5\u0bc7.\u0bb1\u0bbe\u0bae.\u0bb5\u0bc7.\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0b95\u0bb3\u0bbf\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0b85\u0bae\u0bcd\u0baa\u0bbe\u0b9a\u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Selvarani p",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Malavika",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavithra k",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavi malar K",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavithra p",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Uthaya Tamil Selvam",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavitha v",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhanush suthan",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suresh Gopi",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Aarthi",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saraswathi. K",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Alex Milton paul",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahila",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arunkumar.c",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M AMARNATH",
    role: "GHSS,VANNICONENDAL, TIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SUNIL S",
    role: "\u0b85\u0bb0\u0b9a\u0bbf\u0ba9\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\u0b95\u0ba9\u0b95\u0bae\u0bcd\u0bae\u0bbe\u0b9a\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "VIJAYA KUMAR B",
    role: "\u0b85\u0bb0\u0b9a\u0bbf\u0ba9\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\u0b95\u0ba9\u0b95\u0bae\u0bcd\u0bae\u0bbe\u0b9a\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "BOOBESH KM",
    role: "\u0b85\u0bb0\u0b9a\u0bbf\u0ba9\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\u0b95\u0ba9\u0b95\u0bae\u0bcd\u0bae\u0bbe\u0b9a\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "BHARATH L",
    role: "\u0b85\u0bb0\u0b9a\u0bbf\u0ba9\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\u0b95\u0ba9\u0b95\u0bae\u0bcd\u0bae\u0bbe\u0b9a\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "HARISH S",
    role: "\u0b85\u0bb0\u0b9a\u0bbf\u0ba9\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\u0b95\u0ba9\u0b95\u0bae\u0bcd\u0bae\u0bbe\u0b9a\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "GOWTHAM R",
    role: "\u0b85\u0bb0\u0b9a\u0bbf\u0ba9\u0bb0\u0bcd \u0bae\u0bc7\u0bb2\u0bcd \u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\u0b95\u0ba9\u0b95\u0bae\u0bcd\u0bae\u0bbe\u0b9a\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bae\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suman",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay. S",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Sabarinathan",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rajarajeahwari",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aneesh. P",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokulnath. A",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanareeshwaran. T",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Murugaraj. P",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "iniya",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "t thennarasu",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lokesh. K",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R. Ragavan",
    role: "GHSS, SERANGULAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishnu",
    role: "GHSS, SERANGULAM, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowtham",
    role: "GHSS, SERANGULAM, ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.Gayathri",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.MADHESH",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Naveena",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogaraj k",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "U.Subasri",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V.Deepika",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.Swetha",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepika R",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Deepika",
    role: "GHSS,PULIVALAM, THANJAVUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mukesh T",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.YOGALAKSHMI",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mangaiyarkarasi",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K .abinash",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G.dharani",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sandhay",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "krishnalatha",
    role: "GHSS,PULIVALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arish",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Selvam maharajan",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Madhan kumar",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muthukukar",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Marimuthu",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aravind",
    role: "GHSS- PUDUR, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hari vignesh",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kapilraj",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Amaravathi",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kasthuri",
    role: "GHSS- PUDUR, SIVAGANGAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Malathi",
    role: "GHSS- PUDUR, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gayathri",
    role: "GHSS- PUDUR, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bharanidharan",
    role: "GHSS MEENSURITI (BOYS), ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abishekdaniel",
    role: "GHSS MEENSURITI (BOYS), ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nataraj",
    role: "GHSS MEENSURITI (BOYS), ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prasanth",
    role: "GHSS MEENSURITI (BOYS), ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhosh",
    role: "GHSS MEENSURITI (BOYS), ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathiyamoorthy",
    role: "GHSS MEENSURITI (BOYS), ARIYALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthika V",
    role: "CHENNAI GIRLS HSS, MH ROAD, PERAMBUR, Chennai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithyasree S",
    role: "CHENNAI GIRLS HSS, MH ROAD, PERAMBUR, Chennai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nagesh",
    role: "CHENNAI GIRLS HSS, MH ROAD, PERAMBUR, Chennai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balaji",
    role: "CHENNAI GIRLS HSS, MH ROAD, PERAMBUR, Chennai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nivetha",
    role: "CHENNAI GIRLS HSS, MH ROAD, PERAMBUR, Chennai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rubhashree A",
    role: "CHENNAI GIRLS HSS, MH ROAD, PERAMBUR, Chennai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.ARABU NISHA",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J.ANNIE MYSTIC",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K.KAMILA BANU",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.sinonmani",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.M.BEEVI BATHIMA",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.DHARSHINI",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.TAMIL VANI",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "p.SANMUGA PRIYA",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.BADHURU NISHA",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N.SAFRIN",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.MARIYA GEETHA",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.ANGELO SALOMIYA",
    role: "GGHSS KAYALPATNAM, THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "James",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balaji s",
    role: "GBHSS PETNANAICKENPALAYAM, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pradeep Raj R",
    role: "GBHSS PETNANAICKENPALAYAM, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J.Rajesh",
    role: "GBHSS PETNANAICKENPALAYAM, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinothini",
    role: "GBHSS PETNANAICKENPALAYAM, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thirisha.c",
    role: "GBHSS PETNANAICKENPALAYAM, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "SIVABALAN.T",
    role: "GBHSS PETNANAICKENPALAYAM, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mithun Sharma",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vignesh",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Angamuthu",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.Harish",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A. Balakrishnan",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vetriselvan",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharun",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Kasidurai",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balachandar",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dinesh kumar R",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manoj k",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Kasidurai",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tamil selvan S",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manoj k",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vetriselvan",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajai",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Praveen P",
    role: "GBHSS THALAIVASAL, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "kanmani",
    role: "GHSS KANNANKURICHI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.JEEVIKA",
    role: "GHSS KANNANKURICHI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.JEEVITHA",
    role: "GHSS KANNANKURICHI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Nivedha",
    role: "GHSS KANNANKURICHI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.MAHESHWARI",
    role: "GHSS KANNANKURICHI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.DHANUSHIYA",
    role: "GHSS KANNANKURICHI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhinakaran R",
    role: "GHSS NADUPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarathi C",
    role: "GHSS NADUPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anandha kumar K",
    role: "GHSS NADUPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Janani T",
    role: "GHSS NADUPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karishma S",
    role: "GHSS NADUPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arunachalam R",
    role: "GHSS NADUPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arthi S",
    role: "GHSS NADUPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Surya prakash P",
    role: "GBHSS JARI KONDALAMPATTI , SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthikeyan V",
    role: "GBHSS JARI KONDALAMPATTI , SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan P",
    role: "GBHSS JARI KONDALAMPATTI , SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sundraperumal B",
    role: "GBHSS JARI KONDALAMPATTI , SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarathy A",
    role: "GBHSS JARI KONDALAMPATTI , SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathish",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R.muthaiyan",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Murali",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.poovarasan",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Selvajeeva. S",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aadhavan A",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathish V",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poovarasan S",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Guna P",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prakash K",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sujay P",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prithviraj G",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Venkatesh J",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathish V",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Reman Sri J T",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pushparaj A",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sasikumar A",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhi P",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalki Sri T",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balaji P",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gayathri K",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muruganantham M",
    role: "GHSS MALLIYAKARAI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anitha",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "thavani ",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "saratha devi",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalaivani",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jeevitha",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavithra",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavani",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abirami",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhiya",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Raghu",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saravanaperumal",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vignesh",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suresh",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohan kumar",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Viswa",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan P",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veeran",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Venkat krishnan",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shanmugam",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sudhakar",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "arjun",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sivakumar",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "karthik",
    role: "GHSS-KALAMARUTHUR, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sunil kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\n \u0b92\u0bb0\u0b95\u0bcd\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8., Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naresh kuma",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\n \u0b92\u0bb0\u0b95\u0bcd\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8., Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariprasath",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\n \u0b92\u0bb0\u0b95\u0bcd\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8., Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishal",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\n \u0b92\u0bb0\u0b95\u0bcd\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8., Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sandy",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf,\n \u0b92\u0bb0\u0b95\u0bcd\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1\u0baa\u0bcd\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8., Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anusuya D",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0b9a\u0bcb\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Raja M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0b9a\u0bcb\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lochana M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0b9a\u0bcb\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rikesh S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0b9a\u0bcb\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariharen S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0b9a\u0bcb\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarumathi R",
    role: "GHSS, Sunampedu, CHENGALPATTU, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajaykumar K",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balamurali B",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Essakkimuthu M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jeeva S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karan K",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthick K",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavipriyan K",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Navin T",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sajin S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saflathi M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subash P",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Supriya N",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Visak",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vasan G",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abisha S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajitha S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ashika K",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akalya S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rajeswari M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Babitha M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb0\u0bbe\u0b9c\u0bbe\u0b95\u0bcd\u0b95\u0bae\u0b99\u0bcd\u0b95\u0bb2\u0bae\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Ezhilarasan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1\u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \n  \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bbe\u0ba4\u0bb5\u0bc2\u0bb0\u0bcd, Madurai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V Jegan",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Loganadhan",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Kabilan",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Arjun",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "N Jegathesan",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Naveen Kumar",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anusuya D",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Raja M",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lochana M",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rikesh S",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariharan S",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bharath L",
    role: "GBHSS THAMMAMPATTI, SALEM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Boobesh K M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijaya Kumar B",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sunil S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Harish S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowtham R",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mary D",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nandhini S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elhilarasan R",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayasuriya B",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rabin R",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Salmon R",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rithika S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, TIRUVALLUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinaya S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Adhersa S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ashika K",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ashika M A",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Asin P",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aswathi K L",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sreenisha S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abiram m J",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abishek K",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajith Aruldhas A",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajith K S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash R",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ganesh Prabhu M S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hari Prasanth S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithin E",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Paramesh P",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sajith S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sharana Kumar S",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sujin S M",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sujith P",
    role: "Govt model higher secondary school munchirai, PERAMBALUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishnu B",
    role: "Govt model higher secondary school munchirai, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aswathy V",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0b9f\u0bbf\u0baf\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd, Thiruvallur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muthumari A",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priya J",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Remya C",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abijith ",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Adharsh",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajin",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akis",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akshay",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anandhu S",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aneesh",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arun",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jino",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rahul",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rijo",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saijith",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shibin",
    role: "VGHSS KANDAMANGALAM, Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suman",
    role: "VGHSS KANDAMANGALAM, TIRUVARUR, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "arpira",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "suman",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokul Raj G",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariprakash S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prem Kumar R",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karan Parath B",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathya Prithesa S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srisan S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tamil Thendral S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinu V",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sasinath",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokul Raj G",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "George Benadas",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7.\u0ba8\u0bbf.\u0baa,\u0baa\u0bb3\u0bc1\u0b95\u0bb2\u0bcd, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathiya Veni M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan ",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bhavani ",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Girija",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavitha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Logapriya",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nisha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shanthi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinodha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yamuna",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Sathish",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J Jeevananthan",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathiya Veni M",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan ",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bhavani ",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Girija",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavitha",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Surya prakash P",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Christopher Raj",
    role: "GBHSS, Valavanur., Villupuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jeshva",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithesh",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arul Reshan",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Niza moideen",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nivash",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bharath Raj",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thangadurai",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yuvarath",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Christopher Raj",
    role: "Kandachipuram Government boys higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Praveen Kumar",
    role: "Kandachipuram Government boys higher secondary school, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vetrival",
    role: "Kandachipuram Government boys higher secondary school, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Megasri",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A Aswitha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf -\n  \u0b87\u0bb0\u0bbe\u0b9a\u0bcd\u0b9a\u0bbe\u0ba3\u0bcd\u0b9f\u0bbe\u0bb0\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb2\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T Dhanushiya",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Ananthi",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Dhanusuya",
    role: "\u0b85.\u0bae\u0bc7.\u0ba8\u0bbf.\u0baa\u0bb3\u0bcd\u0bb3\u0bbf-\u0baa\u0bc6\u0bb0\u0bae\u0bcd\u0baa\u0bb2\u0bc2\u0bb0\u0bcd, Perambalur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Augasthiya",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A Vishali",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Muthallamma",
    role: "GOVERNMENT HIGHER SECONDARY SCHOOL,VADAKADU, PUDUKKOTTAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Deva",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lokeshwaran T",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anandharaj M",
    role: "GHSS-MAMBALAPPATTU, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balakrishnan V",
    role: "GHSS-MAMBALAPPATTU, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gopinath K",
    role: "GHSS-MAMBALAPPATTU, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karan R",
    role: "GHSS-MAMBALAPPATTU, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mukesh R",
    role: "GHSS-MAMBALAPPATTU, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muthu M",
    role: "GHSS-MAMBALAPPATTU, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Paramasivam V",
    role: "GHSS-MAMBALAPPATTU, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Raja E",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Atchaya",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E Atchaya",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Varsha",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G Yashika",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Karthik",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B Suriya",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Preamkumar",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Balaji",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Mohan Raj",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Kanagaraj",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T Sureka",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Vishal",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B Vignesh",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G Lakshmikanth",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Karthikeyan",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Barathi",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Abinaya",
    role: "Government higher secondary school Aiyyampalayam, Trichy, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "C Murugananthan",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Dinesh",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dilip Kumar",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Bala Krishna",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "L Kabilan",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A Gopi",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Manoj",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A Karthikeyan",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Vignesh",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Dharsan Kumar",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Kiswar",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D Manikandan",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lingees Kumar",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Sriram",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Vignesh",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Bharathraj",
    role: "Govt boys' higher secondary school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Govintharaj G",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithish R",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srikaran B",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manojkumar V",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ponnusamy R",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohana Sundar M",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anantha Raj V",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suganya J",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priya Dharshini M",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharani B R",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Girija S",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abirami S",
    role: "GHSS-MAMBALAPPATTU, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kanagavalli K",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kaviyarasi G",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lakshmi A",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi K",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nishanthi V",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aakash K",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ambathvalavan S",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Chidambaram B",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhanush S",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowtham S",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Madhan G",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan P",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Navinthiran S",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithin Arasu E",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pachaiyappan P",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Periyarpriyan P",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vignesh S",
    role: "Shanmuga school, VILUPPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anand A",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arigovindan A",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arikaran E",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Balaji T",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Boopathi E",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Boopathi K",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharnesh M",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elangovan S",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jagaseesh E",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthikeyan J",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishore P",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Magesh R",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nagaraj V",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Narayanamoorthy K ",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "NithishKumar S",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pachaiyappan S",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pavunkumar S",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ragul M",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sakthivel R",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Seetharaman S",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sriram A",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suresh K",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thanigaivel M",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tharunraj S",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vetriselvan A",
    role: "GBHSS Kilpennathur, TIRUVANNAMALAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Kannappan",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Linghesh",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Naveen Kumar",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A Nithish",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V Pandiyaraj",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D Poovarasan",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Sairam",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Sanjay",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A Agathiyamoorthy",
    role: "Government Boys higher secondary school Kanchi, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Tamilarasan",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Thirumai",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Vignesh",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Vijay",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V Gokul",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "C Prakasham",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Ramu",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Arulmani",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T Gopinath",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Venkatesh",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E Vetrivel",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E Ajith",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B Yuvaraj",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Prasanna",
    role: "GBHSS Mallavadi, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arjun A",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ragavan R",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saravanan  M",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hemanathan V",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thoneswaran E",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prasanth B",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pandiyan A",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gopinath P",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhosh M",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suriya S",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rakki R",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Baranidharan B",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mugilan S",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kamalesh S",
    role: "Government Boys higher secondary school, Polur, Tiruvannamalai, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pitchaimani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gunal pandi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pethanan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Selva ganapathi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Siva",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yuvaraj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Yogeshwaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muthupandi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathish Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohan Raj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijaya Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hari Suthan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthikai Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalingam",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Maherdran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nagajothi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Puliyamaal",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bhavani iswari",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "karthika",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bavani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hema",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V. Ravivarma",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Ajay",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A. Akash",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B. Anbuselvan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E. Bose",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V. Elamaran",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T. Thirumalai",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Ayyappan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A. Naveen",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Vengatesan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Anandhakrishnan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R. Paramasivam",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V. Santhosh",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G. Poovarasan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P. Sathish",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T. Sanju",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K. Suresh",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G. Thamarai Selvan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R. Vetriselvan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J. Hariharan",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Sriraman",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V. Vignesh",
    role: "GHSS-RISHIVANTHIYAM, KALLAKURICHI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Durga P",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Monisha M",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shalini R",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anandha babu.m",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aravindhan M",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Basakaran S",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "BNithya nandham V",
    role: "GHSS-MAMBALAPPATTU, VILLUPURAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pranesh J",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay C",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay M",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sriram V",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohanraj R",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poovarasi",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sangavi",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rajeswari M",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayashree S",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepa K",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Keerthana G",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Renuka P",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thulasi S",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lovisha R",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sahira Banu P",
    role: "CHENNAI GIRLS HSS, BUDDHA STREET, KORUKKUPET, CHENNAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalaiyadharshini. K",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priyadharshini. S",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Roobini. K",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Suba. M",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thilip. M",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash. J",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthikesan. S",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen. J",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Amir. J",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mugesh. M",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sakthidhanasekaran. B",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ishanth. N",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manikandan. J",
    role: "AMGHSS THIRUKKUVALAI, NAGAPATTINAM, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajay M",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Boopathi P",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhamotharan. M",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharshini. T",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gopika, R",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Harinith. S",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jeevitha. M",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Logeshwari. K",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ranjana Sri. S",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ranjitha. S",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aravinth. P",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bhuvana Karthikeyan. N",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowtham. K",
    role: "GHSS KANNANKURICHI, Salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lokesh. G",
    role: "KR Saratha Ghss Nalatinputhur, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ABINAYA S",
    role: "Govt model higher secondary school munchirai, Kanyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ADHERSA S",
    role: "Govt model higher secondary school munchirai, Kanyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ASHIKA K",
    role: "Govt model higher secondary school munchirai, Kanyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ASHIKA MA",
    role: "Govt model higher secondary school munchirai, Kanyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ASIN P ",
    role: "Govt model higher secondary school munchirai, Kanyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Muthumari",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Nithya",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J Prathista",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Rachel Elizabeth",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D parvathi",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Umadevi",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G muthupriya",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Bhuveneshwari",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Sathana",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D Ponmari",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Susmitha",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M. Bhubaneswari",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D Selvarani",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithish.R",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohana Sundar.M",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ponnusamy",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ananadharaj",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharani B r",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dharani BR",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priyadarshini M",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srikaran",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Monisha M",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ahmed",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Girija S",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohana K",
    role: "Arijar Anna Government Higher Secondary School, Vaiyampatti, TIRUCHIRAPPALLI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sujatha ",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Durga",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pravin",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sakthivel",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Yasvanth",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Somambika M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ramya K",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthika ",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vengadesh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srisanth",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Velmurugan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sabarish",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vengadesh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srisanth",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b87\u0bb2\u0bbe\u0bb2\u0bbe\u0baa\u0bc7\u0b9f\u0bcd\u0b9f\u0bc8, Karur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Parameswaran D",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thayumanavan M",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ezhilarasan S",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gopish K",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinithsaran K",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akish B",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vairavan K",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vishva P",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vignesh S",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhineshkumar ",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poovarasan",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vijay R",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayaprakash B",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arthi V",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Atchaya R",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepa S",
    role: "GHSS THANIKOTTAGAM, Nagapattinam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ashif Shaheer ",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohammedalsabith",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohammed shalim",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shabil",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bharathkumar",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rinshad",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nishanth",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Asnal",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muhamat sahil",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalaiyadharshini. K",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavitha",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kamalesh S",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Muhammedhaseeb",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thajudheen",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohammed shibibili",
    role: "GHSS DEVARSHOLA, NILGIRIS, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arivuselvam",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subash",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhanush",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Priyan",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Saran kumar",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Surya",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sudhakar",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Danush A",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishore Kumar",
    role: "GBHSS, KV KUPPAM , VELLORE, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Premkumar",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "JEEVANANTHAM C",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kavish",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthi raja",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kabileesh",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhoshkumar",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "G Kathirvel",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manoj k",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arul selvam",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Harish raghavendra",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Praveen",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P surya",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ayyappan",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gowthami",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sakthi ",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinesh D",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Madhan",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Silambarasan",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mathan G",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tamilarasan",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhamathara",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prakash",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Samesh",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vignesh kumar S",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthikeyan K",
    role: "Government High School Ganga, Tirupur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Alagu Viji",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ariyanachi",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Geetha",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalesswari ",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mathubala",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi K",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mariyal",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nethra M",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhi B",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash k",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ayyadurai",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "kaliraj ",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "maharaja M",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mathan E",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mottaiyasamy",
    role: "GHSS villiseri, Thoothukudi, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "D Akash",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Arun Kumar",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Chandramouli",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Chandru",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "R Deepak",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J Gunasekaran",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Manoj",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "T Sam Nirmal Singh",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B Sarath Vishal",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "W Sam Daniel",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Sarguna",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Vinith",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Yogananthar",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "H Niranjan",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Madhavan",
    role: "GHSS Ilalgudi, Tiruchirappallli, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kapil Raj",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aravind",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hari Vignesh",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M Muthukumar",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P Manimuthu",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "J Manoj Kumar",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arish",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Madhumitha ",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Banumathi",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aparna",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Malathi",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayasri",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "arpita",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aparna",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokulraj M",
    role: "K.R.S GOVT HSS SCHOOL NALATINPUDUR, KOVILPATTI , THOOTHUKKUDI , \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinash",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinesh J",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishore Kumar",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sabarivasan",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manoj",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sridharan",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jagadesh",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abilash",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srinivas",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen kumar",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pradhap",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bharani ",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sandhiya",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Manisha",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prasidha",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sadhana",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lavanya",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vaishalini",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ayesha",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thillairasi",
    role: "\u0b85\u0ba3\u0bcd\u0ba3\u0bbe \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7.\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0b9f\u0bcd\u0b9f\u0bc0\u0bb8\u0bcd\u0bb5\u0bb0\u0bae\u0bcd, Kumbakonam, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sabarivasan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sudhan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srinath",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sbiraj",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rathish",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepak",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: " Jeeva",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhosh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thamaraiselvan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhosh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kuguthan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aswin",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karthik",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0b9f\u0bcd\u0b9f\u0bc8, Thanjavur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "kingslin yapesh",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "nambi selvam",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Esai vendhan",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "saravanan",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aswin",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "vishnu raj",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "surya prakash",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "ram smith",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "laksmana priyan",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "masilamani",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "kavi arun",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "arun kumar",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sudhalai suresh",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "sam  napthali durai",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishon",
    role: "GHSS KALAKAD, THIRUNELVELI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tamil vignesh",
    role: "\u0b9a\u0bc1\u0ba8\u0bcd\u0ba4\u0bb0\u0bae\u0bcd \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb4\u0bbf\u0b9a\u0bc8, Thiruvallur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Monishwaran",
    role: "\u0b9a\u0bc1\u0ba8\u0bcd\u0ba4\u0bb0\u0bae\u0bcd \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb4\u0bbf\u0b9a\u0bc8, Thiruvallur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay",
    role: "\u0b9a\u0bc1\u0ba8\u0bcd\u0ba4\u0bb0\u0bae\u0bcd \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bb4\u0bbf\u0b9a\u0bc8, Thiruvallur, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tharunkumar V",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokulraj M",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kalaimani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Karuppuswamy",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sangliswaran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subash",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vimalkumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Brabhakumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sriram S",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ravichandran",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ramkumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Alaguraja",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepika ",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thangavel",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Silabarasan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bc7\u0bae\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anusha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Catherine",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Miraclin derhy",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithya kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ramalakshmi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhini",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash k",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Akash m",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Asim",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Chandru ",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhanalakshmi ",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jebin",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kishore Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohammed aathil",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ram kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd \u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bc1\u0bb5\u0bbf\u0bb3\u0bc8, Kanniyakumari, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vanaja",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bae\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba8\u0bbe\u0baf\u0b95\u0bcd\u0b95\u0ba9\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, DINDIGUL, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pitchaimani",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0bb5\u0bbf\u0bb0\u0bc1\u0bb5\u0bc0\u0b9f\u0bc1, Dindigul, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Durga P",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Monisha m",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shalini R",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anandha Babu M",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Aravindhan M",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Baskaran S",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithya Nandhanam V",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pranesh J",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay C",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanjay M",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sriram V",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohanraj R",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poovarasi",
    role: "\u0baa\u0bc6\u0ba9\u0bcd\u0ba9\u0b95\u0bb0\u0bcd, RANIPET, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ajay M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Boopathi P",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dhamotharan M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokul K",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jeevanandham C",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gnanaprakasam S",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kaviyarasu G",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarathi",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nagaraj G",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prasanth A",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Thirumurugan M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Elaiyaraja P",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Prasanth M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nandhanathan S",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohan Raj K",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Naveen M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vairavel K",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kathirvel M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Divya R",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kowsalya S",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kaviya S",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nivetha K",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Shobanadharshini S",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nandhini A",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pooja D",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kiruba K",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Vinothini M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Deepika M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Srinidhi K",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nandhini R",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Monika S",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Pasupathi S",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Surya A",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rajee K",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Jayam R",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Janani R",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Tamilarasi L",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Subramani M",
    role: "Goverment Higher Secondary School, Kanchenaickenpatti, salem, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohanasundaram",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinesh",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kubendran",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Govindharaj",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarathi",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kabilan",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nithiarasan.M",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veeramani.g",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Veerakumar",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mohanasundaram",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Abinesh",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kubendran",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sarathi",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kabilan",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sheeba",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lakshmi",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "James",
    role: "GOVERNMENT BOYS HR SEC SCHOOL, GANDARVAKKOTTAI, PUDUKKOTTAI., \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V. Sangeetha",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "E.karthika21",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Poonkidi",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.karthika",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sanmuga priya",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Malaiammaln.N",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.santhana blessy",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rajeshwari",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., SIVAGANGAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "veyilatchi",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Swetha.b",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.Uchimahali",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.mukila",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sathana",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "V.maha pradeepa",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "A.karthika",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "POORVIKA P",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Krishnaveni.M",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sasikala.v",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M.santhana blessy",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S Maharasi",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "v.santhiya",
    role: "\u0bb5\u0bc0.\u0baa\u0bbe.\u0b95.\u0baa\u0bca \u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \u0b95\u0baf\u0ba4\u0bcd\u0ba4\u0bbe\u0bb0\u0bcd., THOOTHUKUDI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "K Naveen Kumar",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf, \n \u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0bcd\u0b95\u0bc1\u0bb4\u0bbf-, Kanchipuram, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "B. Devi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Alagu thavam",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sangeetha.A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S.vishal",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Anitha",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "M kanjana",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Mahalakshmi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "C.Meenatchi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Santhiya",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Nathiya.A",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.santhosh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Arunpandi",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Rohan",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "S. Santhanam",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "P.santhosh",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Santhanakaruppu.m",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "AnnapooraniR",
    role: "\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0bae\u0bc7\u0bb2\u0bcd\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0bb3\u0bcd\u0bb3\u0bbf.\u0baa\u0bbe\u0bb2\u0bae\u0bc7\u0b9f\u0bc1, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Kottsi karuppan",
    role: "\u0b85.\u0b86.\u0bae\u0bc7.\u0ba8\u0bbf. \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0ba4\u0bbe \u0bb5\u0bbe\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Bala Mugesh",
    role: "\u0b85.\u0b86.\u0bae\u0bc7.\u0ba8\u0bbf. \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0ba4\u0bbe \u0bb5\u0bbe\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Sivakumar",
    role: "\u0b85.\u0b86.\u0bae\u0bc7.\u0ba8\u0bbf. \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0ba4\u0bbe \u0bb5\u0bbe\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, MADURAI, \n12th class",
   rating: 5
  },
  {
    text: "Good",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Dinesh",
    role: "\u0b85.\u0b86.\u0bae\u0bc7.\u0ba8\u0bbf. \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0ba4\u0bbe \u0bb5\u0bbe\u0b9f\u0bbf\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bbf, MADURAI, \n12th class",
   rating: 5
  },

  {
    text: " Good ",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Gokul",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR,\n12th class",
    rating: 5
  },
  {
    text: " Great ",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Lithishwaran",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR,\n12th class",
    rating: 5
  },
  {
    text: "Excellent",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ponraman n",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR,\n12th class",
    rating:4
  },
  {
    text: "Good ",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Hariprasath B",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR,\n12th class",
    rating:4
  },
  {
    text: "Great",
    image: "/academy/Logos/schools/NEHRUJI GHSS,IDAYAKOTTAI.png",
    name: "Ragul",
    role: "Govt modeL HIGHER SECONDARY SCHOOL, elakurchi, ARIYALUR,\n12th class",
    rating: 4
  },
  {
    text: "“Our teachers now use videos and smartboards. It makes it easier for us to understand things.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Kangeyam School, Tamil Nadu",
    rating: 5
  },
  {
    text: "“Earlier, we had only lectures. Now, we have quizzes and group activities on the screen. It’s more fun to learn.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Kangeyam School, Tamil Nadu",
    rating: 4
  },
  {
    text: "“Classes are more interesting now. We play games and do activities to understand topics.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Sunrise Academy, Bangalore",
    rating: 5
  },
  {
    text: "“I used to feel sleepy in class. Now I enjoy coming to school because the teaching is more exciting.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Sunrise Academy, Bangalore",
    rating: 4
  },
  {
    text: "“ Our teachers are trying new ideas. Sometimes we even learn through stories or real-life examples.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Greenfield Public School, Delhi",
    rating: 5
  },
  {
    text: "“Earlier classes felt boring, but now they ask us questions and make us do creative work. It’s fun.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Greenfield Public School, Delhi",
    rating: 4
  },
  {
    text: "“Now we use tablets and online tools in class. It helps me learn better and faster.” ",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Westside High, Mumbai",
    rating: 5
  },
  {
    text: "“I love the new way of learning with videos and apps. It’s like studying and playing together.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Westside High, Mumbai",
    rating: 5
  },
  {
    text: "“Teachers seem happier now. They give us more attention and are less stressed.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Valley View Institute, Himachal Pradesh",
    rating: 4
  },
  {
    text: "“Class is more relaxed. We also do small mindfulness activities sometimes, which I like.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Valley View Institute, Himachal Pradesh",
    rating: 4
  },
  {
    text: "“Now we know how teachers will mark our tests. It feels fair and clear.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Coastal Academy, Kerala",
    rating: 4
  },{
    text: "“Before, every teacher gave marks differently. Now it’s the same system, and we understand it better.”",
    image: "/academy/traditionalmethod/RareMinds ISO Logo-01.png",
    name: "Student",
    role: "Coastal Academy, Kerala",
    rating: 4
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Student Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our students say
          </h2>
          <p className="text-center mt-5 opacity-75">
            Hear from our students about their learning experiences
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={30} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={32} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
