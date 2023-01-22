const items = [
    {
        id: "1",
        name: "Veg Steam momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDiNGm83LsYDKPwh9sDqlU5RHy6p7r8U9eA&usqp=CAU",
        price: "49",
        quantity: "8 pcs"
    },
    {
        id: "2",
        name: "Paneer Steam momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WKsAkrW2-u5a1CbP-Pf0QDltAi3ILmiCtw&usqp=CAU",
        price: "8",
        quantity: "8 pcs"
    },
    {       
        id: "3",
        name: "Chicken Steam momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShO4wPIhiCIfVHMna23fSKpUwFErYngQPzrg&usqp=CAU",
        price: "70",
        quantity: "8 pcs"
    },
    {
        id: "4",
        name: "Paneer Fried momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRMTGTt1gLfMrjmxS2wffRp_93EaBOb8rTug&usqp=CAU",
        price: "90",
        quantity: "8 pcs"
    },
    {
        id: "5",
        name: "Chicken Fried momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVSLWuW4VeZJF1FckFx6L7PPg-sGBaQj6xxA&usqp=CAU",
        price: "90",
        quantity: "8 pcs"
    },
    {
        id: "6",
        name: "Veg kurkure momo",
        image: "https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/bovaozfntudokwydunwk",
        price: "90",
        quantity: "8 pcs"
    },
    {
        id: "7",
        name: "Paneer kurkure momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrCqB2U_x_a7vCI5e_ozJ1SpywBSjoOT-Yw&usqp=CAU",
        price: "99",
        quantity: "8 pcs"
    },
    {
        id: "8",
        name: "Chicken kurkure momo",
        image: "https://lh3.googleusercontent.com/ZTaQbXGPCnLXxEABPRYfMcEGa4V2eJvvH5XDFpf6mnU3q3HQw9vl7o47hJLQ64d8bzYgeEXKltiWSqD5Y7I_ngWKML3zawiFpNdm3vIUFA=w512-rw",
        price: "99",
        quantity: "8 pcs"
    },
    {
        id: "9",
        name: "Veg kothe momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBThLe3RJwK4omcZKdqlFMlHWdPueknPQ0mA&usqp=CAU",
        price: "80",
        quantity: "8 pcs"
    },
    {
        id: "10",
        name: "Paneer kothe momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSNwhEO-eHFidygYVIN_wrSL-nOJDOak3BKQ&usqp=CAU",
        price: "99",
        quantity: "8 pcs"
    },
    {
        id: "11",
        name: "Chicken kothe momo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0s1u1zsU1DZepH6rZVu1T6Hq6PmCqljg7A&usqp=CAU",
        price: "99",
        quantity: "8 pcs"
    },
    {
        id: "12",
        name: "Plain Maggie",
        image: "https://vegplatter.in/files/public/images/partner/catalog/225/maggi-recipe%20%281%29.jpg",
        price: "30",
        quantity: "6 pcs"
    },
    {
        id: "13",
        name: "Butter Maggie",
        image: "https://lh3.googleusercontent.com/VbmryO8Na1UcsovJoJ9IbARYY7jZhgqPnW2zdSnc_nFIN9geK74qEaOWkoskf9UgVpZSG_FWpi2RcDTLLxyjZDPVDwuzUvdVD130uv4",
        price: "60",
        quantity: "1 bowl"
    },
    {
        id: "14",
        name: "Masala Maggie",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4os9iA4zVmsJjFZnlgYLGM7nKFUZ0gADSNA&usqp=CAU",
        price: "60",
        quantity: "1 bowl"
    },
    {
        id: "15",
        name: "Khao Maggie",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2auWVEUxYNyTawgEtlGN5ZPygiiILOVce_WTELzRdExmcCnp94oH0R7bHRKDU77jTMIk&usqp=CAU",
        price: "40",
        quantity: "1 bowl"
    },
    {
        id: "16",
        name: "Kullad Tea",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdEd6P5I6JgrHU-YTHqjjHVQS6fap-UEPZcA&usqp=CAU",
        price: "15",
        quantity: "1 cup"
    },
    {
        id: "18",
        name: "Kullad Coffee",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3-QWJKl8IOA4C7vmEFMvF7dq7gQcjvF4NAA&usqp=CAU",
        price: "60",
        quantity: "1 cup"
    },
    {
        id: "19",
        name: "Boiled egg",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwpusXXbkgjUY2oHRLFt2_gw4U1xBKVCnLiQ&usqp=CAU",
        price: "12",
        quantity: ""
    },
    {
        id: "20",
        name: "Bun maska",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        price: "35",
        quantity: ""
    },
    {
        id: "21",
        name: "Chicken soup",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6iZdd15F2--RGaOBzekH8c1B8eHZiXMgeAQ&usqp=CAU",
        price: "30",
        quantity: "1 bowl"
    }
]
export default items;