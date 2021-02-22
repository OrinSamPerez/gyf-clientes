export default function Heroe(props){
    return(
        <>
            <style jsx>{`
                .heroe-container{
                    margin: 0%;
                    position: relative;
                    background-color: aqua;
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    height: 60vh;
                    transition:all 1s;
                    background-image: url('');
                    animation-name: baner;
                    animation-duration: 23s;
                    animation-iteration-count:infinite;
                    text-align: center;
                    background-image: url(${props.Image});
                    
                }
                
                
               
                .heroe-info{
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    color: white;
                    background-color: rgba(0, 22, 40, .65);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    
                }
                @media (max-width:790px){
                    .heroe-info{
                        padding-top:30px;
                        display:inline-block;
                    }
                }
                .heroe-info h1{
                    font-size:39px;
                }
                .heroe-info p{
                    font-size:19px;
                }
                .logo{
                    width:100px;
                    border-radius:100px;
                    height: 100px;
                }
            `}</style>
        <div className="heroe-container">
            <div className="heroe-info">
                <div>
                    <img className="logo"src={props.imageLogo}/>
                    <h1>{props.Empresa}</h1>
                    <p>Dirrecion: <span>{props.Direccion }</span></p>
                    <p>Telefono: {props.telefono}</p>
                    <br></br>
                </div>

            </div>
        </div>
        </>
    )
}