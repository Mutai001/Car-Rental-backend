import { Context } from 'hono';
import { getAllBookings } from './Booking.Service';
import { fetchOneBookings, CreateBookings, UpdateBookings, DeleteBookings } from './Booking.Service';
// Get all bookings
export const getAllBookingsData = async (c: Context) => {
     try {
        //limit the number of bookings to be returned

        const limit = Number(c.req.query('limit'))

        const data = await getAllBookings(limit);
        if (data == null || data.length == 0) {
            return c.text("bookings not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// fetch one bookings
export const getOneBookingsData = async (c: Context) => {
    const id = c.req.param("id")
    const bookings = await fetchOneBookings(parseInt(id))
    if(bookings === undefined){
        return c.json({message: "No bookings found"},404)
    }
    return c.json(bookings,200)
}

//create bookings
export const createBookingsData = async (c: Context, next: Function) => {
    
    try{
       const bookings = await c.req.json()
    const response = await CreateBookings(bookings)
    return c.json({message: response},201)
    } catch(err){
        return c.json({message: err},500)
    }
}

//update bookings
    export const updateBookingsData = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Bookings = await c.req.json();
    try {
        // search for the bookings
        const searchedBookings = await getAllBookings(id);
        if (searchedBookings == undefined) return c.text("bookings not found", 404);
        // get the data and update it
        const res = await UpdateBookings(id, Bookings);
        // return a success message
        if (!res) return c.text("bookings not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


//delete bookings
// export const deleteBookingsData = async (c: Context) => {
//     const id = c.req.param("id")   
//     const response = await DeleteBookings(parseInt(id))
//     return c.json({message: response},200)

// }


export const deleteBookingsData = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
 
    try {
        //search for the Booking
        const Booking = await DeleteBookings(id);
        if (Booking== undefined) return c.text("Booking not found", 404);
        //deleting the Booking
        const res = await DeleteBookings(id);
        if (!res) return c.text("Booking not deleted", 404);
 
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


