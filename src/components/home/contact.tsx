import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../ui/contact-form";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  Get in Touch
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-dark">
                  Contact Emma
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have questions about my services or want to book a class? Fill
                  out the form or use the contact details below to get in touch.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+44 07789993890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">
                        emmaneilsonpilates@pm.me
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Studio Location</h3>
                      <p className="text-muted-foreground">Edinburgh, UK</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <ContactForm />
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
