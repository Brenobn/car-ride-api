import repositoryRide from "../repositories/repository.ride.js";

function List() {
  const rides = repositoryRide.List();
  return rides;
}

export default {List};