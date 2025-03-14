import { execute } from "../database/sqlite.js";

async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status, status_not) {
  let filter = []; 
  
  let sql = `select r.*, 
  u.name as passenger_name, u.phone as passenger_phone,
  d.name as driver_name, d.phone as driver_phone
  from rides r
  join users u on (u.user_id = r.passenger_user_id)
  left join users d on (d.user_id = r.driver_user_id)
  where r.ride_id > 0 `;

  if(passenger_user_id) {
    sql = sql + " and r.passenger_user_id = ? ";
    filter.push(passenger_user_id);
  }

  if(pickup_date) {
    sql = sql + " and r.pickup_date = ? ";
    filter.push(pickup_date);
  }

  if(ride_id) {
    sql = sql + " and r.ride_id = ? ";
    filter.push(ride_id);
  }

  if(driver_user_id) {
    sql = sql + " and r.driver_user_id = ? ";
    filter.push(driver_user_id);
  }

  if(status) {
    sql = sql + " and r.status = ? ";
    filter.push(status);
  }

  if(status_not) {
    sql = sql + " and r.status <> ? ";
    filter.push(status_not);
  }
  
  const rides = await execute(sql, filter);
  return rides;
}

async function Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address) {
  
  let dt = new Date().toISOString("pt-BR", {
    timeZone: "America/Rio_de_Janeiro"
  }).substring(0, 10);

  let sql = `insert into rides(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status)values(?, ?, ?, ?, ?, ?, 'P') returning ride_id`;
  
  const ride = await execute(sql, [passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, dt]);
  return ride[0];
}

async function Delete(ride_id) {
  
  let sql = `delete from rides where ride_id = ?`;
  
  await execute(sql, [ride_id]);
  return { ride_id };
}

async function Finish(ride_id, passenger_user_id) {
  
  let sql = `update rides set status = 'F' where ride_id = ? and passenger_user_id = ?`;
  
  await execute(sql, [ride_id, passenger_user_id]);
  return { ride_id };
}

async function DriverList(driver_user_id) {
  
  let sql = `select r.*, 
  u.name as passenger_name, u.phone as passenger_phone
  from rides r
  join users u on (u.user_id = r.passenger_user_id)
  where r.pickup_date = CURRENT_DATE
  and r.driver_user_id = ?

  UNION

  select r.*, 
  u.name as passenger_name, u.phone as passenger_phone
  from rides r
  join users u on (u.user_id = r.passenger_user_id)
  where DATE(r.pickup_date) = CURRENT_DATE
  and r.driver_user_id is null`;
  
  
  const rides = await execute(sql, [driver_user_id]);
  return rides;
}

async function Accept(ride_id, driver_user_id) {
  
  let sql = `update rides set status = 'A', driver_user_id = ? where ride_id = ?`;
  
  await execute(sql, [driver_user_id, ride_id]);
  
  return { ride_id };
}

async function Cancel(ride_id) {
  
  let sql = `update rides set status = 'P', driver_user_id = null where ride_id = ?`;
  
  await execute(sql, [ride_id]);
  
  return { ride_id };
}

export default { List, Insert, Delete, Finish, DriverList, Accept, Cancel };