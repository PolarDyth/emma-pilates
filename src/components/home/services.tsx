import { Clock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import AnimatedSection from "../ui/animated-section";
import { PilatesClass, getLevelDisplay, getLevelColor } from "@/lib/types/Class";
import { formatDuration, formatPrice } from "@/lib/class-service";

interface ServicesProps {
  classes: PilatesClass[];
}

export default function Services({ classes }: ServicesProps) {
  return (
    <section id="classes" className="py-16 md:py-24 bg-accent/30">
      <div className="mx-10 md:mx-0">
        <div className="container mx-auto">
          <div>
            <AnimatedSection>
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  Classes
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-dark">
                  Pilates Classes for Every Body
                </h2>
                <p className="text-lg text-muted-foreground">
                  Whether you&apos;re new to Pilates or looking to deepen your
                  practice, I offer a range of classes to meet your needs.
                </p>
                <div className="mt-6 text-center">
                  <blockquote className="text-xl italic text-primary font-medium">
                    &quot;Change happens through movement and movement heals&quot;
                  </blockquote>
                  <cite className="text-sm text-muted-foreground mt-2">
                    — Joseph Pilates
                  </cite>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((pilatesClass, index) => {
              const imageUrl = pilatesClass.image?.asset?.url || "/pilates/group-standing-up.jpeg";
              const slug = typeof pilatesClass.slug === 'string' ? pilatesClass.slug : pilatesClass.slug.current;
              
              return (
                <AnimatedSection key={pilatesClass._id} delay={0.1 + (index * 0.1)}>
                  <Link href={`/services/${slug}`}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                      <CardContent className="p-0">
                        <div className="h-56 relative rounded-t-xl overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={pilatesClass.image?.alt || pilatesClass.title}
                            className="object-cover"
                            fill
                            unoptimized
                          />
                          {/* Level Badge */}
                          <Badge className={`absolute top-4 left-4 ${getLevelColor(pilatesClass.level)} border`}>
                            {getLevelDisplay(pilatesClass.level)}
                          </Badge>
                          {/* Duration overlay */}
                          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                            <Clock className="h-4 w-4" />
                            {formatDuration(pilatesClass.duration)}
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-3">
                          <CardHeader className="p-0">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {pilatesClass.title}
                            </CardTitle>
                            {pilatesClass.category && (
                              <span className="text-sm text-muted-foreground">
                                {pilatesClass.category.title}
                              </span>
                            )}
                          </CardHeader>

                          {pilatesClass.description && (
                            <p className="text-gray-600 line-clamp-2 text-sm">
                              {pilatesClass.description}
                            </p>
                          )}

                          {/* Benefits preview */}
                          {pilatesClass.benefits && pilatesClass.benefits.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {pilatesClass.benefits.slice(0, 2).map((benefit, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-200"
                                >
                                  {benefit}
                                </Badge>
                              ))}
                              {pilatesClass.benefits.length > 2 && (
                                <Badge 
                                  variant="outline" 
                                  className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-200"
                                >
                                  +{pilatesClass.benefits.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t">
                            {pilatesClass.maxParticipants && (
                              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Users className="h-4 w-4" />
                                <span>Max {pilatesClass.maxParticipants}</span>
                              </div>
                            )}
                            <span className="text-lg font-bold text-primary ml-auto">
                              {formatPrice(pilatesClass.price)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
          
          <div>
            <AnimatedSection delay={0.4}>
              <div className="mt-12 text-center">
                <Button asChild size="lg">
                  <Link href="/services">View All Classes</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
