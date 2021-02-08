import SearchIcon from '@material-ui/icons/Search';
export default function Search(){
    return(
        <form className="search-form">
            <div>
                <input type="text" placeholder="Buscar aqui"/>
                <li><SearchIcon/></li>
            </div>
        </form>
    )
}