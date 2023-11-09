export default function LoadingContent({innerCircleColor}) {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
                display: "flex",
                marginTop: "50px",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                backgroundImage: "conic-gradient(transparent, blue )",
                borderRadius: "50%",
                animation: "spin 3s infinite linear"
            }}>
                <div style={{

                    position: "relative",
                    width: "50%",
                    height: "50%",
                    borderRadius: "50%",
                    backgroundColor: innerCircleColor,

                }}></div>
            </div>
        </div>
    )
}