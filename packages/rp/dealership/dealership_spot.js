class DealershipSpot {
    static load() {
        connection.query("SELECT * FROM dealership_spot", [], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Info] Error loading dealership spots");
                return;
            }

            let loaded = 0;

            if (dealershipSpots && dealershipSpots != null) {
                for (var key in dealershipSpots) {
                    var spot = dealershipSpots[key];
                    if (spot.vehicle != null) {
                        spot.vehicle.destroy();
                        spot.vehicle = null;
                    }
                }
            }

            result.forEach((value, key) => {
                if (value == null) return;;

                dealershipSpots[key] = value;
                dealershipSpots[key].position = JSON.parse(value.position);
                let rotation = JSON.parse(value.rotation);
                dealershipSpots[key].rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z);

                dealershipSpots[key].label = "dealership-spot-"+value.id;
                dealershipSpots[key].vehicle = null;

                if (value.hash != null) {
                    let vehicle = mp.vehicles.new(value.hash, dealershipSpots[key].position);
                    vehicle.rotation = dealershipSpots[key].rotation;
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