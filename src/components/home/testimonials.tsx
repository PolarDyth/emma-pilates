import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-dark">
              What My Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from people who have transformed their bodies and lives
              through my Pilates instruction.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden relative">
                  <Image
                    src="/placeholder.svg?height=200&width=200&query=professional headshot of middle aged woman"
                    alt="Sarah, 42"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah, 42</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic">
                &quot;Emma&apos;s classes have completely transformed my posture
                and relieved my chronic back pain. Her attention to detail and
                personalized approach make all the difference.&quot;
              </blockquote>
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden relative">
                  <Image
                    src="/placeholder.svg?height=200&width=200&query=professional headshot of senior man"
                    alt="Robert, 65"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Robert, 65</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic">
                &quot;After retirement, I wanted to stay active but needed
                something gentle on my joints. Emma&apos;s beginner classes were
                perfect, and I&apos;ve gained strength I never thought possible
                at my age.&quot;
              </blockquote>
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden relative">
                  <Image
                    src="/placeholder.svg?height=200&width=200&query=professional headshot of young professional woman"
                    alt="Mia, 35"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Mia, 35</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic">
                &quot;As someone who sits at a desk all day, Emma&apos;s
                corporate Pilates sessions have been a lifesaver. Our whole team
                looks forward to them, and we&apos;ve all noticed improved focus
                and energy.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
