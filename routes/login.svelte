<script context="module">
    export async function post(req, abort, redirect) {
        if (req.user) redirect('/')

        var data = Object.assign({}, req.body);
        if (!data.email) {
            data.error = 'Email cannot be blank'
            return data;
        }
        if (!data.password) {
            data.error = 'Password cannot be blank'
            return data;
        }
        const User = {find: function() { return data.password === '1234' ? {name: 'Glen'} : null}}
        const user = await User.find({where: {email: req.body.email}})
        if (user) {
            redirect('/')
        } else {
            data.error = 'Incorrect username or password';
        }

        return data;
    }
</script>
<script>
    export let email, password, error;
    // TODO: validations on client and server-side: non-blank, email.
</script>

<form action="" method="POST">
    <p>{error || ''}&nbsp;</p>
    <label>
        Email:
        <input name="email" value="{email}"/>
    </label>
    <label>
        Password:
        <input type="password" name="password" value="{password}"/>
    </label>
    <button type="submit">Log in</button>
</form>
