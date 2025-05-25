import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto">
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-dark">
              Pilates Programs for Every Body
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you&apos;re new to Pilates or looking to deepen your
              practice, I offer a range of services to meet your needs.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Group Classes</CardTitle>
                <CardDescription>
                  Small groups for personalized attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 relative rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="Group Pilates Class"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">
                    Available Levels:
                  </h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Beginner - Focus on fundamentals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Intermediate - Build strength & control</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Advanced - Challenge your practice</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground pt-2">
                    Maximum 8 participants per class to ensure quality
                    instruction and individual attention.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">1-to-1 Sessions</CardTitle>
                <CardDescription>
                  Personalized private instruction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 relative rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600&query=private pilates session with instructor and client"
                    alt="Private Pilates Session"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Benefits:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Fully customized to your goals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Focused attention on form & technique</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Flexible scheduling options</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground pt-2">
                    Perfect for beginners, those with specific needs, or anyone
                    wanting accelerated progress.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Corporate Packages</CardTitle>
                <CardDescription>Wellness for your workplace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 relative rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600&query=corporate pilates class in office setting"
                    alt="Corporate Pilates"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Offerings:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>On-site classes at your workplace</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Desk-friendly exercises & stretches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Customized wellness programs</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground pt-2">
                    Boost employee wellbeing, reduce stress, and improve
                    productivity with regular Pilates sessions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
