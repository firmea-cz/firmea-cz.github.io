from http.cookies import SimpleCookie

def cookie_create(name, value, path='/', expires=None, max_age=None, httponly=False, samesite='Lax'):
    """
    Creates a list of ('Set-Cookie', header_value) tuples for a single cookie.

    Args:
        name (str): The name of the cookie.
        value (str): The value of the cookie.
        path (str, optional): The path for the cookie. Defaults to '/'.
        expires (str, optional): GMT expiration string (e.g., 'Thu, 01 Jan 1970 00:00:00 GMT'). Defaults to None.
        max_age (int, optional): Max age in seconds. Defaults to None.
        httponly (bool, optional): Set the HttpOnly flag. Defaults to True.
        samesite (str, optional): Set the SameSite attribute ('Lax', 'Strict', 'None'). Defaults to 'Lax'.

    Returns:
        list: A list containing one tuple: ('Set-Cookie', formatted_header_string).
              Returns an empty list if name or value is empty/None.
    """
    if not name or value is None: # Basic validation
        print(f"Warning: Attempted to create cookie with empty name ('{name}') or None value.")
        return []

    cookie = SimpleCookie()
    cookie[name] = value
    cookie[name]['path'] = path

    # Add security and lifetime attributes if specified
    if httponly:
        cookie[name]['httponly'] = True
    if samesite:
        cookie[name]['samesite'] = samesite
    if expires:
        cookie[name]['expires'] = expires
    if max_age is not None: # Check for None explicitly as 0 is valid
        cookie[name]['max-age'] = max_age

    headers = []
    # There will only be one morsel since we created one cookie
    for morsel in cookie.values():
        # morsel.output(header='') gives the value part like 'key=val; path=/; httponly...'
        header_value = morsel.output(header='').strip()
        headers.append(('Set-Cookie', header_value)) # Append the tuple

    return headers

def cookie_clear(name, path='/'):
    """
    Creates a list of ('Set-Cookie', header_value) tuples to clear a cookie.

    Args:
        name (str): The name of the cookie to clear.
        path (str, optional): The path of the cookie (must match original). Defaults to '/'.

    Returns:
        list: A list containing one tuple: ('Set-Cookie', formatted_header_string).
              Returns an empty list if name is empty/None.
    """
    if not name:
        print("Warning: Attempted to clear cookie with empty name.")
        return []

    cookie = SimpleCookie()
    cookie[name] = "" # Clear value
    cookie[name]['path'] = path
    cookie[name]['expires'] = 'Thu, 01 Jan 1970 00:00:00 GMT' # Expire immediately
    cookie[name]['max-age'] = 0 # Another way to expire

    # Generate the header string
    header_value = cookie[name].output(header='').strip()
    return [('Set-Cookie', header_value)] # Return as a list of tuples
