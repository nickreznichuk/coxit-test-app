import "./globals.css";
import React from "react";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
            <title>Coxit Test App</title>
        </head>
        <body>
            {children}
        </body>
        </html>
    );
}
