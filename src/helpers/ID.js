module.exports = {
        /**
         * Devuelve un ID generado a partir del tiempo actual
         * @return Number
         */
        generateID(){
                const date = new Date();
                const ID = date.getTime();
                console.log(ID)
        }
}