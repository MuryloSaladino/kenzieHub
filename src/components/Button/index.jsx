import { Link } from "react-router-dom";
import { StyledButton } from "./styles";

export function Button({ link, children, ...rest}) {
    return(
        <StyledButton link={link} {...rest} >
            {link ? <Link to={link}>{children}</Link> : children}
        </StyledButton>
    )
}