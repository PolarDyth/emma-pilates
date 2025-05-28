import { Brain, Sparkles, Zap } from "lucide-react";

export default function CorePrinciples() {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h3 className="text-2xl font-bold text-primary mb-6">
          Core Principles of Pilates
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold text-dark mb-2">Concentration</h4>
            <p className="text-muted-foreground text-sm">
              Focusing your mind on each movement enhances body awareness and
              maximizes results.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold text-dark mb-2">Control</h4>
            <p className="text-muted-foreground text-sm">
              Every movement is performed with complete muscular control,
              preventing injury and building strength.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold text-dark mb-2">Centering</h4>
            <p className="text-muted-foreground text-sm">
              All movements originate from your core, or &quot;powerhouse,&quot;
              creating a strong foundation for all exercises.
            </p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
          <blockquote className="text-center text-lg italic text-primary">
            &quot;Breathing is the first act of life and the last, our very life
            depends on it&quot;
          </blockquote>
          <cite className="text-center block text-sm text-muted-foreground mt-2">
            — Joseph Pilates
          </cite>
        </div>
      </div>
    </div>
  );
}
