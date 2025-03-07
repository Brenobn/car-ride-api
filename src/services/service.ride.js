import repositoryRide from "../repositories/repository.ride.js";

async function List() {
  const rides = await repositoryRide.List();
  return rides;
}

export default {List};