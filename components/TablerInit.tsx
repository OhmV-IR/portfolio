"use client"

import { useEffect } from "react";

export default function TablerInitalizer() {
    useEffect(() => {
        import("@tabler/core/dist/js/tabler" as any).then(() => {
            import("bootstrap/dist/js/bootstrap.bundle" as any).then(() => { }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }, []);

    return null;
}