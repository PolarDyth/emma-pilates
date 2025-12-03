import { Activity, Dumbbell, Heart, Pause } from 'lucide-react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/animated-section'

export default function Benefits() {

  return (
    <div className="grid md:grid-cols-2 gap-12 mb-12">
              <AnimatedSection delay={0.1}>
                <div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=800&width=600&query=woman doing pilates reformer exercise in studio with natural light"
                      alt="Pilates Benefits"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </AnimatedSection>
              <div>
                <div>
                  <AnimatedSection delay={0.2}>
                    <h3 className="text-2xl font-bold text-primary mb-6">Key Benefits of Pilates</h3>
                  </AnimatedSection>
                  <div className="space-y-4">
                    <AnimatedSection delay={0.3}>
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Pause className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dark">Improved Flexibility</h4>
                          <p className="text-muted-foreground text-sm">
                            Gentle, controlled movements gradually increase range of motion and joint mobility.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.4}>
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dark">Increased Strength</h4>
                          <p className="text-muted-foreground text-sm">
                            Builds lean muscle mass without bulk, focusing on deep core muscles often missed in
                            traditional workouts.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.5}>
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dark">Better Posture</h4>
                          <p className="text-muted-foreground text-sm">
                            Corrects imbalances and alignment issues, reducing back pain and improving overall posture.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.6}>
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dark">Stress Reduction</h4>
                          <p className="text-muted-foreground text-sm">
                            Mindful movement combined with focused breathing creates a meditative state that reduces
                            stress and anxiety.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </div>
  )
}