const stats = [
  {
    value: "50,000+",
    label: "Affordable Units",
    description: "Available across Illinois",
  },
  {
    value: "102",
    label: "Counties Served",
    description: "Statewide coverage",
  },
  {
    value: "25,000+",
    label: "Families Housed",
    description: "In the past year",
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    description: "From surveyed residents",
  },
]

export function StatsSection() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Making a Difference in Illinois
          </h2>
          <p className="text-pretty text-lg opacity-90">
            IHDA has been connecting Illinois residents with affordable housing for over 50 years.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center"
            >
              <div className="mb-2 text-4xl font-bold md:text-5xl">
                {stat.value}
              </div>
              <div className="mb-1 text-lg font-semibold">
                {stat.label}
              </div>
              <div className="text-sm opacity-80">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
