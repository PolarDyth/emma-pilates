import Link from "next/link"
import Image from "next/image"
import { Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PilatesClass, getLevelDisplay, getLevelColor } from "@/lib/types/Class"
import { formatDuration, formatPrice } from "@/lib/class-service"

interface ClassCardProps {
  pilatesClass: PilatesClass
}

export default function ClassCard({ pilatesClass }: ClassCardProps) {
  const imageUrl = pilatesClass.image?.asset?.url || "/pilates/group-standing-up.jpeg"
  const slug = typeof pilatesClass.slug === 'string' ? pilatesClass.slug : pilatesClass.slug.current

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group bg-white border h-full flex flex-col">
      <Link href={`/services/${slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={pilatesClass.image?.alt || pilatesClass.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
      </Link>

      <CardHeader className="pb-3 pt-5 px-5">
        <Link href={`/services/${slug}`}>
          <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {pilatesClass.title}
          </h3>
        </Link>
        {pilatesClass.category && (
          <span className="text-sm text-muted-foreground">
            {pilatesClass.category.title}
          </span>
        )}
      </CardHeader>

      <CardContent className="pt-0 px-5 pb-5 flex flex-col flex-1">
        {pilatesClass.description && (
          <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed text-sm flex-1">
            {pilatesClass.description}
          </p>
        )}

        {/* Benefits preview */}
        {pilatesClass.benefits && pilatesClass.benefits.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pilatesClass.benefits.slice(0, 2).map((benefit, index) => (
              <Badge 
                key={index} 
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
                +{pilatesClass.benefits.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {/* Footer with price and participants */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {pilatesClass.maxParticipants && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>Max {pilatesClass.maxParticipants}</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <span className="text-lg font-bold text-primary">
              {formatPrice(pilatesClass.price)}
            </span>
            {pilatesClass.price && (
              <span className="text-xs text-gray-500 block">per session</span>
            )}
          </div>
        </div>

        <Link 
          href={`/services/${slug}`} 
          className="inline-flex items-center justify-center text-primary hover:text-primary/80 font-semibold transition-colors mt-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/5"
        >
          View Class Details →
        </Link>
      </CardContent>
    </Card>
  )
}

