import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.css"

export const Header = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
            <nav>
            <Button variant="standart" fullWidth={false} size="medium">
                <Link to="authorization" className="link">log in</Link>
          </Button>
            </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};
