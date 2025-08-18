import { Card, CardContent } from "../ui/card";
import inclusiveImage from "../../assets/inclusive-training.jpg";
import disciplineImage from "../../assets/mind-body-discipline.jpg";
import communityImage from "../../assets/supportive-community.jpg";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const FeatureCards = () => {
  const features = [
    {
      title: "Entrenamiento inclusivo para todos",
      description: "Desde principiantes hasta atletas, nuestros entrenamientos amigables dan la bienvenida a todos los cuerpos, niveles y aspiraciones.",
      image: inclusiveImage,
      alt: "Grupo diverso aprendiendo técnicas de esgrima"
    },
    {
      title: "Disciplina mente y cuerpo",
      description: "La esgrima desarrolla enfoque, paciencia y resiliencia es un entrenamiento tanto para tu cuerpo como para tu mente.",
      image: disciplineImage,
      alt: "Esgrimista demostrando enfoque y disciplina mental"
    },
    {
      title: "Comunidad de apoyo",
      description: "Únete a un ambiente de equipo donde el ánimo, el trabajo en equipo y el respeto son parte de cada clase.",
      image: communityImage,
      alt: "Equipo de esgrima apoyándose mutuamente"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {features.map((feature, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: false, margin: "-130px" });
                return (
                  <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ willChange: "opacity, transform", height: "100%" }}
                  className="flex h-full"
                  >
                  <Card
                    className="group hover:scale-105 transition-all duration-500 bg-card border-border/50 hover:border-primary/50 hover:shadow-glow flex flex-col h-full w-full"
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </div>
                    <div className="p-4 sm:p-6 space-y-2 sm:space-y-4 flex-1 flex flex-col">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                      {feature.description}
                      </p>
                    </div>
                    </CardContent>
                  </Card>
                  </motion.div>
                );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
