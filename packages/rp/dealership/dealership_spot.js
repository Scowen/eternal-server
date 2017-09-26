class DealershipSpot {
    static load() {
        connection.query("SELECT * FROM dealership_spot", [], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Info] Error loading dealership spots");
                return;
            }

            let loaded = 0;

            result.forEach((value, key) => {
                if (value == null) return;;

                dealershipSpots[key] = value;
                dealershipSpots[key].position = JSON.parse(value.position);

                dealershipSpots[key].label = "dealership-spot-"+value.id;
                dealershipSpots[key].vehicle = null;

                if (value.hash != null) {
                    let vehicle = mp.vehicles.new(value.hash, dealershipSpots[key].position);
                    vehicle.rotation = new mp.Vector3(0, value.heading, 0);
                    vehicle.setColour(value.color1, value.color2);

                    dealershipSpots[key].vehicle = vehicle;
                    
                    labels[dealershipSpots[key].label] = {
                        text: `${value.name}\n$${Utilities.number_format(value.price)}\nStock: ${value.stock}`,
                        position: dealershipSpots[key].position,
                        r: 224,
                        g: 195,
                        b: 51,
                        a: 255,
                        scale: 0.4,
                        distance: 7,
                    };
                } else {
                    labels[dealershipSpots[key].label] = {
                        text: `#${value.id}`,
                        position: dealershipSpots[key].position,
                        r: 180,
                        g: 180,
                        b: 180,
                        a: 200,
                        scale: 0.4,
                        distance: 5,
                    };
                }


                loaded++;
            });

            console.log(`[Info] ${loaded} dealership spots`);
        });
    }
}

module.exports = DealershipSpot;