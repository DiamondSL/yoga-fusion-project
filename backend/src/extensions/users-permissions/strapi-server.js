module.exports = (plugin) => {
    const register = plugin.controllers.auth.register;

    plugin.controllers.auth.register = async (ctx) => {
        await register(ctx);
        const userId = ctx.response.body.user.id;
        const updatedUser = await strapi.documents('plugin::users-permissions.user').update({
            documentId: userId,
            data: {
                phoneNumber: ctx.request.body.phoneNumber,
                socials: [ctx.request.body.instagramAccount]
            },
        });
        ctx.body = { message: `User ${updatedUser.username} registered successfully.` };
    };

    return plugin;
};