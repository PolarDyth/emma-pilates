import Benefits from "./pilates-explination/benefits";
import CorePrinciples from "./pilates-explination/core-principles";
import TypeOfPilates from "./pilates-explination/types-of-pilates";

export default function Pilates() {
  return (
    <section
      id="what-is-pilates"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-accent/20"
    >
      <div className="mx-10 md:mx-0">
      <div className="container mx-auto">
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Discover Pilates
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-dark">
              What is Pilates and Its Benefits?
            </h2>
            <p className="text-lg text-muted-foreground">
              Pilates is a holistic exercise system designed to elongate,
              strengthen, and restore the body to balance.
            </p>
          </div>
        </div>
        <CorePrinciples />
        <Benefits />
        <TypeOfPilates />
      </div>
      </div>
    </section>
  );
}
