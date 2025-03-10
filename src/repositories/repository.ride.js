import { execute } from "../database/sqlite.js";

async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status) {
  let filter = []; 
  
  let sql = `select *
  from rides
  where ride_id > 0 `;

  if(passenger_user_id) {
    sql = sql + " and passenger_user_id = ? ";
    filter.push(passenger_user_id);
  }

  if(pickup_date) {
    sql = sql + " and pickup_date = ? ";
    filter.push(pickup_date);
  }

  if(ride_id) {
    sql = sql + " and ride_id = ? ";
    filter.push(ride_id);
  }

  if(driver_user_id) {
    sql = sql + " and driver_user_id = ? ";
    filter.push(driver_user_id);
  }

  if(status) {
    sql = sql + " and status = ? ";
    filter.push(status);
  }
  
  const rides = await execute(sql, filter);
  return rides;
}

async function Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address) {
  
  let sql = `insert into rides(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status)values(?, ?, ?, ?, ?, CURRENT_DATE, 'P') returning ride_id`;
  
  const ride = await execute(sql, [passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address]);
  return ride[0];
}

async function Delete(ride_id) {
  
  let sql = `delete from rides where ride_id = ?`;
  
  await execute(sql, [ride_id]);
  return { ride_id };
}

export default { List, Insert, Delete };