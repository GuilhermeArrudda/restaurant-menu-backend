-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoppingSessions" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shoppingSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartItens" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "shoppingSessionId" INTEGER NOT NULL,

    CONSTRAINT "cartItens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- AddForeignKey
ALTER TABLE "shoppingSessions" ADD CONSTRAINT "shoppingSessions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cartItens" ADD CONSTRAINT "cartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cartItens" ADD CONSTRAINT "cartItem_shoppingSessionId_fkey" FOREIGN KEY ("shoppingSessionId") REFERENCES "shoppingSessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
