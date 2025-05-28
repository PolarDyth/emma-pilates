import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function TypeOfPilates() {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-bold text-primary mb-6">
          Types of Pilates Exercises
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden border border-accent/30 hover:shadow-md transition-all duration-300">
            <div className="h-48 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&query=pilates mat exercises in bright studio"
                alt="Mat Pilates"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-dark mb-2">Mat Pilates</h4>
              <p className="text-muted-foreground text-sm">
                Performed on a mat using your body weight as resistance. These
                foundational exercises focus on core strength, proper alignment,
                and breathing techniques.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-accent/30 hover:shadow-md transition-all duration-300">
            <div className="h-48 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&query=pilates reformer machine in modern studio"
                alt="Reformer Pilates"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-dark mb-2">Reformer Pilates</h4>
              <p className="text-muted-foreground text-sm">
                Utilizes a specialized machine with springs, straps, and a
                sliding carriage to provide resistance. Excellent for building
                strength while maintaining proper alignment.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-accent/30 hover:shadow-md transition-all duration-300">
            <div className="h-48 relative">
              <Image
                src="/placeholder.svg?height=400&width=600&query=pilates equipment studio with various apparatus"
                alt="Equipment-Based Pilates"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-dark mb-2">
                Equipment-Based Pilates
              </h4>
              <p className="text-muted-foreground text-sm">
                Incorporates specialized equipment like the Cadillac, Chair, and
                Barrels to target specific muscle groups and address individual
                needs.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <blockquote className="text-xl italic text-primary font-medium">
            &quot;Change happens through movement and movement heals&quot;
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2">
            — Joseph Pilates
          </cite>
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="#contact">Ready to get started?</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
