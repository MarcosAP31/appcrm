import './App.css';
import List from "./modules/product/List";
import Create from "./modules/product/Create";
import Edit from "./modules/product/Edit";
import ListContact from "./modules/contact/ListContact";
import CreateContact from "./modules/contact/CreateContact";
import EditContact from "./modules/contact/EditContact";
import {Route,BrowserRouter as Router,Routes} from "react-router-dom";
import {Link} from "react-router-dom";
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
              <Link className="nav-item nav-link active" to="/" aria-current="page">Sistema<span class="visually-hidden">(current)</span></Link>
          </div>
      </nav>
    <div className="container">
      <br></br>
      <Routes>
      <Route exact path="/" element={<List/>}/>
      <Route exact path="/create" element={<Create/>}/>
      <Route exact path="/edit/:ProductId" element={<Edit/>}/>
      <Route exact path="/contacts" element={<ListContact/>}/>
      <Route exact path="/createContact" element={<CreateContact/>}/>
      <Route exact path="/editContact/:ContactId" element={<EditContact/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
