import { Button } from "../ui/button";
import heroImage from "../../assets/hero-fencer.jpg";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest es un valor entre 0 y 1
    // 0.3 = 30% del scroll total
    if (latest > 0.3) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional fencer in elegant pose"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />
      </div>

      {/* Content animado con scroll global */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 container mx-auto px-6"
        style={{ willChange: "opacity, transform" }}
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/30 backdrop-blur-sm border border-accent rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground font-medium">
              ¡Supera tus límites cada día!
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 mb-12">
            <h1 className="text-6xl md:text-8xl font-light text-foreground italic leading-tight">
              SISTEMA
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              DEPORTES
            </h2>
          </div>

          {/* CTA Buttons */}
        </div>
<div className="flex md:hidden items-center space-x-8 ml-auto">
  <div className="flex items-center justify-center space-x-2">
    <Link to="/login">
      <Button>
        INICIAR
      </Button>
    </Link>
  </div>
</div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

  

    </section>
  );
};

export default HeroSection;
