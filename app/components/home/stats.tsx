function Stats({
  stats,
  small,
}: {
  stats: { value: string | number; label: string }[];
  small: boolean;
}) {
  return (
    <section className="py-10 bg-gradient-to-r from-dark to-darker">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className={`glass-card ${small ? "sm:p-2 p-3" : "sm:p-6 p-3"}`}
            >
              <h3
                className={`${
                  small ? "sm:text-2xl text-1xl" : "sm:text-3xl text-2xl"
                } font-bold text-primary-400 sm:mb-2 mb-1`}
              >
                {stat.value}
              </h3>
              <p className="text-light/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
