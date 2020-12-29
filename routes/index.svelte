<script context="module">
    export async function get(req, abort, redirect) {
        var user = {
            name: 'Glen'
        }
        return {user};
    }
    export async function post(req, abort, redirect) {
        var user = {
            name: req.body.user_name
        }
        return {user};
    }
</script>
<script>
    export let user;
</script>

<a href="/login">Log in</a>

<h1>Hi {user.name}!</h1>

<form action="" method="POST">
    Change name: <input name="user_name" value="val"/>
    <button type="submit">Submit</button>
</form>
