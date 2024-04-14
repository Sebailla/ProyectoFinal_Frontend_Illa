import { useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTicketStore } from "../hooks/useTicketStore";

export const OwnShops = () => {

    const { tickets, startGetTickets } = useTicketStore();

    useEffect(() => {
        startGetTickets();
    }, [])

    if (!tickets) {
        return (
            <>
                <Navbar />
                <Typography variant="h4">Cargando tus compras...</Typography>
            </>
        );
    }

    return (
        <>
            <Navbar />
            {
                tickets.length === 0 &&
                <>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Typography variant="h4">Aun no tienes compras</Typography>
                        <Typography variant="body1" style={{ marginTop: '20px', marginBottom: '20px' }}>¡Agrega algunos productos para comenzar!</Typography>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                <Typography variant="button" sx={{ color: 'white' }}>
                                    Ir a comprar
                                </Typography>
                            </Button>
                        </Link>
                    </div>
                </>
            }

            {
                tickets.length > 0 && 
                <>
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="h4">Historial de Compras</Typography>
                    </div>
                    {tickets.map((ticket) => (
                        <div key={ticket._id} style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
                            <Typography variant="h5">Código: {ticket.code}</Typography>
                            <Typography variant="body1">Fecha de compra: {ticket.purchase_datetime}</Typography>
                            <Typography variant="body1">Monto total: ${ticket.amount.toFixed(2)}</Typography>
                            <Typography variant="body1">Correo de compra: {ticket.purchase}</Typography>
                            <Typography variant="h6">Items:</Typography>
                            {ticket.items.map((item, index) => (
                                <div key={index}>
                                    <Typography variant="body2">{item.title} - Cantidad: {item.quantity} - Precio unitario: ${item.price.toFixed(2)} - Total: ${item.total.toFixed(2)}</Typography>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            }
        </>
    );
};

