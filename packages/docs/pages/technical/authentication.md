# Authentication

Automatisch uses SSO (Single Sign On) to authenticate users. This means that you can use your existing credentials to login to Automatisch.

The application saves Identity Provider (IDP) information in the database. This information is used to authenticate users.

```sql 
saml_auth_providers  {
    id UUID pk
    name character varying(255)
    certificate text
    signature_algorithm character varying(255)
    issuer character varying(255)
    entry_point text
    firstname_attribute_name text
    surname_attribute_name text
    email_attribute_name text
    role_attribute_name text
    default_role_id UUID
    active boolean
    created_at timestamp with time zone
    updated_at timestamp with time zone
}
```

## Login

To login to Automatisch, you can use your existing credentials. If you don't have an account yet, you can create one by clicking on the `Sign up` button.
