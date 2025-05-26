import * as React from "react"
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";

interface ParticleButtonProps extends ButtonProps {
    onSuccess?: () => void;
    successDuration?: number;
    particleColor?: string;
    particleSize?: number;
}

function SuccessParticles({
    buttonRef,
    particleColor,
    particleSize = 8,
}: {
    buttonRef: React.RefObject<HTMLButtonElement>;
    particleColor?: string;
    particleSize?: number;
}) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
        <AnimatePresence>
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{ 
                        position: 'fixed',
                        left: centerX, 
                        top: centerY,
                        width: particleSize,
                        height: particleSize,
                        backgroundColor: particleColor || 'var(--particle-color, currentColor)',
                        borderRadius: '9999px'
                    }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        scale: [0, 1.2, 0],
                        x: [0, (i % 2 ? 1 : -1) * (Math.random() * 70 + 30)],
                        y: [0, -Math.random() * 70 - 30],
                    }}
                    transition={{
                        duration: 1.2,
                        delay: i * 0.15,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

function ParticleButton({
    children,
    onClick,
    onSuccess,
    successDuration = 1000,
    className,
    particleColor,
    particleSize,
    ...props
}: ParticleButtonProps) {
    const [showParticles, setShowParticles] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        }
        
        setShowParticles(true);

        if (onSuccess) {
            onSuccess();
        }

        setTimeout(() => {
            setShowParticles(false);
        }, successDuration);
    };

    return (
        <>
            {showParticles && (
                <SuccessParticles 
                    buttonRef={buttonRef}
                    particleColor={particleColor}
                    particleSize={particleSize}
                />
            )}
            <Button
                ref={buttonRef}
                onClick={handleClick}
                className={cn(
                    "relative transition-transform duration-100",
                    showParticles ? "scale-95" : "",
                    className || ""
                )}
                {...props}
            >
                {children}
            </Button>
        </>
    );
}

export { ParticleButton }
