import QRCode from "react-qr-code";
import { ReactDOM } from "react";

function LensQR({link}) {
    const value = link

    return (
        <>
            <div style={{ background: "#fff", height: "auto", margin: 'auto', maxWidth: 200, width: "100%", padding: '15px 15px 10px 15px', borderRadius: '15px' }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%", borderRadius: '10px' }}
                title="Custom Title"
                value={value}
                viewBox={`0 0 256 256`}
              />
            </div>
            
        </>
    )
}

export default LensQR