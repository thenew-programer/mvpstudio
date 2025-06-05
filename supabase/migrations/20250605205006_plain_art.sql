CREATE OR REPLACE FUNCTION set_admin_role(user_email TEXT)
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET role = 'admin'
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;