<script context="module">
    export function get(req, res) {
        var user = {
            name: 'Glen'
        }
        res.json({user}) 
    }
    export function post(req, res) {
        var user = {
            name: req.body.user_name
        }
        res.json({user})
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
