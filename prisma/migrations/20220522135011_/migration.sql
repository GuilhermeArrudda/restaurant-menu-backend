-- DropForeignKey
ALTER TABLE "cartItens" DROP CONSTRAINT "cartItem_shoppingSessionId_fkey";

-- AddForeignKey
ALTER TABLE "cartItens" ADD CONSTRAINT "cartItem_shoppingSessionId_fkey" FOREIGN KEY ("shoppingSessionId") REFERENCES "shoppingSessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
