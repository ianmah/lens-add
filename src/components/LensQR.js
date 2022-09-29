import QRCode from "react-qr-code";
import { ReactDOM } from "react";

function LensQR({link}) {
    const value = link

    return (
        <>
            <div style={{ background: "white", height: "auto", margin: "0 auto", maxWidth: 200, width: "100%", padding: 30 }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                title="Custom Title"
                value={value}
                viewBox={`0 0 256 256`}
              />
            </div>
            
        </>
    )
}

export default LensQR