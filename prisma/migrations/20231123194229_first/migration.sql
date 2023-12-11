CREATE TABLE "Pokemons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "types" TEXT[],

    CONSTRAINT "Pokemons_pkey" PRIMARY KEY ("id")
);
