import serviceRide from "../services/service.ride.js";

async function List(request, response) {

  try {

    const passenger_user_id = request.query.passenger_user_id;
    const pickup_date = request.query.pickup_date;
    const ride_id = request.query.ride_id;
    const driver_user_id = request.query.driver_user_id;
    const status = request.query.status;
    const status_not = request.query.status_not;

    const rides = await serviceRide.List(passenger_user_id, pickup_date, ride_id, driver_user_id, status, status_not);
    response.status(200).json(rides);
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function Insert(request, response) {

  try {

    const passenger_user_id = request.body.passenger_user_id;
    const pickup_address = request.body.pickup_address;
    const pickup_latitude = request.body.pickup_latitude;
    const pickup_longitude = request.body.pickup_longitude;
    const dropoff_address = request.body.dropoff_address;

    const rides = await serviceRide.Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address);
    response.status(201).json(rides);
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function Delete(request, response) {

  try {

    const ride_id = request.params.ride_id;

    const ride = await serviceRide.Delete(ride_id);
    response.status(200).json(ride);
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function Finish(request, response) {

  try {

    const ride_id = request.params.ride_id;
    const passenger_user_id = request.body.passenger_user_id;

    const ride = await serviceRide.Finish(ride_id, passenger_user_id);
    response.status(200).json(ride);
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function DriverList(request, response) {

  try {

    const driver_user_id = request.params.driver_user_id;

    const rides = await serviceRide.DriverList(driver_user_id);
    response.status(200).json(rides);
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function RideDetail(request, response) {

  try {

    const ride_id = request.params.ride_id;

    const rides = await serviceRide.List(null, null, ride_id, null, null);
    response.status(200).json(rides[0]);
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function Accept(request, response) {

  try {

    const ride_id = request.params.ride_id;
    const driver_user_id = request.body.driver_user_id;

    const ride = await serviceRide.Accept(ride_id, driver_user_id);
    response.status(200).json(ride);
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function Cancel(request, response) {

  try {

    const ride_id = request.params.ride_id;

    const ride = await serviceRide.Cancel(ride_id);
    response.status(200).json(ride);
  } catch (error) {
    response.status(500).json({ error });
  }
}

export default { List, Insert, Delete, Finish, DriverList, RideDetail, Accept, Cancel };