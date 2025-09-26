import { ChartArea, Paintbrush, Store } from "lucide-react";

function WhatisAureus() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What is AureusNova
          </h2>
          <p className="text-light/70 max-w-2xl mx-auto">
            AureusNova is a premier NFT marketplace where you can discover,
            collect, and sell extraordinary digital items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center mx-auto mb-6">
              <Paintbrush className="text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-4">Create & Mint</h3>
            <p className="text-light/70">
              Upload your work, set a title and description, and mint your NFTs
              with just a few clicks.
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center mx-auto mb-6">
              <Store className=" text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-4">Buy & Sell</h3>
            <p className="text-light/70">
              Trade NFTs with other collectors on our secure marketplace using
              Ethereum.
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center mx-auto mb-6">
              <ChartArea className=" text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-4">Collect & Earn</h3>
            <p className="text-light/70">
              Build your collection and earn rewards through our community
              programs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatisAureus;
