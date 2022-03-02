const rawData1 = [
    {
        "path_max": 2,
        "path": "[Ax03, Cz01]"
    },
    {
        "path_max": 5,
        "path": "[Az00, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Hx02, By01]"
    },
    {
        "path_max": 2,
        "path": "[By03, Bz02]"
    },
    {
        "path_max": 45,
        "path": "[Ay03, Ax02, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Bx02, By01]"
    },
    {
        "path_max": 11,
        "path": "[Cy03, Cz02]"
    },
    {
        "path_max": 3,
        "path": "[Hx02, Hy03]"
    },
    {
        "path_max": 3,
        "path": "[Cx01, Cy01, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Bz01]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Cy02]"
    },
    {
        "path_max": 5,
        "path": "[By02, Bx03]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Az01]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, Kx01]"
    },
    {
        "path_max": 4,
        "path": "[Ax01, By02]"
    },
    {
        "path_max": 3,
        "path": "[Ax01, Ay02, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Cz01, Cy03, Cz01]"
    },
    {
        "path_max": 2,
        "path": "[Az00, Ay03, Az00]"
    },
    {
        "path_max": 6,
        "path": "[Hy02, Hx02]"
    },
    {
        "path_max": 8,
        "path": "[Ay03, By03]"
    },
    {
        "path_max": 12,
        "path": "[Jy01]"
    },
    {
        "path_max": 2,
        "path": "[Ax01, Cx01, Cx02]"
    },
    {
        "path_max": 26,
        "path": "[Ax03, Ay01, Ax03]"
    },
    {
        "path_max": 19,
        "path": "[Cz02, Cz00]"
    },
    {
        "path_max": 2,
        "path": "[Hx03, Hx01]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Az02, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Ay02]"
    },
    {
        "path_max": 3,
        "path": "[Az01, Bz01]"
    },
    {
        "path_max": 2,
        "path": "[Cx03, Ky03]"
    },
    {
        "path_max": 9,
        "path": "[Az02, Ay01]"
    },
    {
        "path_max": 6,
        "path": "[Cx03, Cz02]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ax02, Ax03]"
    },
    {
        "path_max": 4,
        "path": "[Ay03, By03]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Ky01]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Ax01, Az00]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Hx02, Hx03]"
    },
    {
        "path_max": 5,
        "path": "[Ay02, Ay01]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Kx02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Bx03]"
    },
    {
        "path_max": 45,
        "path": "[By03]"
    },
    {
        "path_max": 9,
        "path": "[Cz02, Cy02]"
    },
    {
        "path_max": 3,
        "path": "[Ax03, Ax01, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, By03]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Cx03]"
    },
    {
        "path_max": 6,
        "path": "[Ay02, Ax02, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Kx01, Kx01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Kz02]"
    },
    {
        "path_max": 6,
        "path": "[Cz00, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Az02]"
    },
    {
        "path_max": 7,
        "path": "[Ay03, Ax02, Ay01]"
    },
    {
        "path_max": 23,
        "path": "[Ay03, By03]"
    },
    {
        "path_max": 8,
        "path": "[Cx02, Cz00]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cy02, Cz00]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cz00, Cz01]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx03]"
    },
    {
        "path_max": 4,
        "path": "[Hy01, Bx01]"
    },
    {
        "path_max": 3,
        "path": "[Az01, Cx02, Az01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Bx02]"
    },
    {
        "path_max": 2,
        "path": "[Cy02, Cz02, Cy02]"
    },
    {
        "path_max": 2,
        "path": "[Cx01, Cx02, Cx03]"
    },
    {
        "path_max": 7,
        "path": "[Hy01, Hy02]"
    },
    {
        "path_max": 5,
        "path": "[Az02, Cx03]"
    },
    {
        "path_max": 4,
        "path": "[Az01, Az02, Az00]"
    },
    {
        "path_max": 6,
        "path": "[Hy03, Hx01]"
    },
    {
        "path_max": 7,
        "path": "[Bx03, Bz02]"
    },
    {
        "path_max": 26,
        "path": "[Cy03, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Ay01]"
    },
    {
        "path_max": 4,
        "path": "[Ax02, Ax03, Ay01]"
    },
    {
        "path_max": 15,
        "path": "[Ay01, Ax03, Ay01]"
    },
    {
        "path_max": 26,
        "path": "[Hx03]"
    },
    {
        "path_max": 2,
        "path": "[Az00, Ax02, Az00]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ax01, Cx01]"
    },
    {
        "path_max": 4,
        "path": "[Cz01, Bx02]"
    },
    {
        "path_max": 2,
        "path": "[Cz01, Cx02, Cz01]"
    },
    {
        "path_max": 3,
        "path": "[Bx03, By03]"
    },
    {
        "path_max": 45,
        "path": "[By01]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Ax01, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Ay02, Hx03]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Cx03, Cy03]"
    },
    {
        "path_max": 6,
        "path": "[Hy01, Bz01]"
    },
    {
        "path_max": 3,
        "path": "[By03, Bx02]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Bx02, By03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Cx02]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, Ay01, Ay02]"
    },
    {
        "path_max": 45,
        "path": "[Ky02]"
    },
    {
        "path_max": 17,
        "path": "[Cx01, Ax01, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Az00, Ax02, Cx02]"
    },
    {
        "path_max": 4,
        "path": "[Hz01, By03]"
    },
    {
        "path_max": 2,
        "path": "[Cy02, Ax03, Cy02]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, Cy02, Cx01]"
    },
    {
        "path_max": 8,
        "path": "[Ay01, Az01]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Ay02, Bx03]"
    },
    {
        "path_max": 27,
        "path": "[Cz01, Cz02]"
    },
    {
        "path_max": 8,
        "path": "[Cx01, Ky03]"
    },
    {
        "path_max": 3,
        "path": "[Cy03, Cx03, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Ay02]"
    },
    {
        "path_max": 3,
        "path": "[Ay03, Az02]"
    },
    {
        "path_max": 3,
        "path": "[Ay02, Az00, Ay02]"
    },
    {
        "path_max": 2,
        "path": "[Hy02, Kz00]"
    },
    {
        "path_max": 2,
        "path": "[By03, Bz02]"
    },
    {
        "path_max": 9,
        "path": "[Az02, Ax03, Az02]"
    },
    {
        "path_max": 8,
        "path": "[Ay03, Ax02, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Cy02, Ay02]"
    },
    {
        "path_max": 8,
        "path": "[Bx01, By03]"
    },
    {
        "path_max": 3,
        "path": "[Ay02, Ax03, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cy01]"
    },
    {
        "path_max": 3,
        "path": "[Hz02, Ky02]"
    },
    {
        "path_max": 3,
        "path": "[Ky03, Ky01]"
    },
    {
        "path_max": 23,
        "path": "[Ay03, Ax03, Ay03]"
    },
    {
        "path_max": 13,
        "path": "[Ay02, Ay03, Ay03]"
    },
    {
        "path_max": 16,
        "path": "[Ay02, Ax03, Ay02]"
    },
    {
        "path_max": 8,
        "path": "[Cz01, Cy03]"
    },
    {
        "path_max": 6,
        "path": "[Hx01, Hy02]"
    },
    {
        "path_max": 7,
        "path": "[By03, Bx03]"
    },
    {
        "path_max": 3,
        "path": "[Cx03, Cy02, Cx03]"
    },
    {
        "path_max": 6,
        "path": "[Cz01, Cx02]"
    },
    {
        "path_max": 3,
        "path": "[Ax01, Hy03]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Kx02, Kx03]"
    },
    {
        "path_max": 3,
        "path": "[Hy01, By03]"
    },
    {
        "path_max": 10,
        "path": "[Jz01]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx03]"
    },
    {
        "path_max": 13,
        "path": "[Ay03, Ay03, Ay01]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, Cy02, Cy03]"
    },
    {
        "path_max": 3,
        "path": "[Ax03, Ax01, Ay03]"
    },
    {
        "path_max": 10,
        "path": "[Hx03, Hx01]"
    },
    {
        "path_max": 2,
        "path": "[Az02, Ay01, Az02]"
    },
    {
        "path_max": 2,
        "path": "[Cz02, Ax03, Cz02]"
    },
    {
        "path_max": 9,
        "path": "[Cy02, Cx01, Cy02]"
    },
    {
        "path_max": 4,
        "path": "[Az01, Ay03]"
    },
    {
        "path_max": 45,
        "path": "[Hy02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Cx03]"
    },
    {
        "path_max": 4,
        "path": "[Ax03, Hy03]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Cy03]"
    },
    {
        "path_max": 4,
        "path": "[Bx02, By02]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Cy02]"
    },
    {
        "path_max": 4,
        "path": "[Az02, Az00, Az01]"
    },
    {
        "path_max": 2,
        "path": "[Hy03, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Ay03, Ax03, Ay01]"
    },
    {
        "path_max": 2,
        "path": "[Hx03, Kx03, Ky02]"
    },
    {
        "path_max": 3,
        "path": "[Bx01, By03]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Az02]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cz00, Cy03]"
    },
    {
        "path_max": 6,
        "path": "[Az01, Ax03, Az01]"
    },
    {
        "path_max": 28,
        "path": "[Ay03, Ax01, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ax01, Ay02]"
    },
    {
        "path_max": 4,
        "path": "[Hz02, By02]"
    },
    {
        "path_max": 6,
        "path": "[Bx02, Bz00]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Hx02, Ky02]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Ay03, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Kx02]"
    },
    {
        "path_max": 45,
        "path": "[Ky03]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Az00, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ax01]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Cy01, Cz02]"
    },
    {
        "path_max": 24,
        "path": "[Hx02, Hx03]"
    },
    {
        "path_max": 7,
        "path": "[Hy03, Hx02]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, Cz00]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Kx03]"
    },
    {
        "path_max": 20,
        "path": "[Az02, Az00]"
    },
    {
        "path_max": 3,
        "path": "[Bx01, By03]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ay03, Ay01]"
    },
    {
        "path_max": 45,
        "path": "[Hy03]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Hx01]"
    },
    {
        "path_max": 5,
        "path": "[By02, By02]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, Ax03, Ay03]"
    },
    {
        "path_max": 6,
        "path": "[By01, Bx02]"
    },
    {
        "path_max": 8,
        "path": "[Cx01, Cy02, Cx01]"
    },
    {
        "path_max": 3,
        "path": "[Bx03, By01]"
    },
    {
        "path_max": 4,
        "path": "[Ay02, By02]"
    },
    {
        "path_max": 21,
        "path": "[By03, By01]"
    },
    {
        "path_max": 3,
        "path": "[Hx01, By01, Bx01]"
    },
    {
        "path_max": 8,
        "path": "[Ax02, Ay03, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Cz02, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, By03]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, Ax01, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx03]"
    },
    {
        "path_max": 2,
        "path": "[By01, Bz02]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cy01]"
    },
    {
        "path_max": 3,
        "path": "[Cz01, Ky01]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Hz01, By03]"
    },
    {
        "path_max": 12,
        "path": "[Bz01, Bx02]"
    },
    {
        "path_max": 7,
        "path": "[Hx03, Hy03]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Ay03]"
    },
    {
        "path_max": 45,
        "path": "[Bz01]"
    },
    {
        "path_max": 10,
        "path": "[Ax02, Cx02, Ax02, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Bx01]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Ax03, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Cy03, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Hx03, Hy03]"
    },
    {
        "path_max": 19,
        "path": "[Kz02]"
    },
    {
        "path_max": 3,
        "path": "[Cy03, Cz00]"
    },
    {
        "path_max": 5,
        "path": "[Cy01, Cx02]"
    },
    {
        "path_max": 2,
        "path": "[Ax01, Ky03]"
    },
    {
        "path_max": 3,
        "path": "[Ax03, Az01, Ax03]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Ax02, Cy03]"
    },
    {
        "path_max": 3,
        "path": "[Cx02, Az01, Cx02]"
    },
    {
        "path_max": 6,
        "path": "[Ax03, Bz02]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ay01]"
    },
    {
        "path_max": 6,
        "path": "[Hz00, Bz00]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Hx02]"
    },
    {
        "path_max": 2,
        "path": "[Cz00, Bz00]"
    },
    {
        "path_max": 5,
        "path": "[Cz00, Cy02]"
    },
    {
        "path_max": 9,
        "path": "[Cx02, Cz01]"
    },
    {
        "path_max": 9,
        "path": "[Ay03, Az02]"
    },
    {
        "path_max": 8,
        "path": "[Cz02, Cx01]"
    },
    {
        "path_max": 3,
        "path": "[Bx02, Bx02, Bx02]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Ax01]"
    },
    {
        "path_max": 8,
        "path": "[Hx02, Ax02, Hx02]"
    },
    {
        "path_max": 2,
        "path": "[Cy02, Cy03, Cy01]"
    },
    {
        "path_max": 3,
        "path": "[Bx02, Bx01, Bx02]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, Cy02, Cx02]"
    },
    {
        "path_max": 8,
        "path": "[Cx01, Cz02]"
    },
    {
        "path_max": 4,
        "path": "[Ax01, Kz02]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Cx02]"
    },
    {
        "path_max": 10,
        "path": "[Ay03, Ay01, Ay02]"
    },
    {
        "path_max": 4,
        "path": "[Kx02, Ky03, Kx02]"
    },
    {
        "path_max": 5,
        "path": "[Az01, Cx02]"
    },
    {
        "path_max": 45,
        "path": "[Ax01, Ax02, Ax03]"
    },
    {
        "path_max": 13,
        "path": "[Ay02, Az00]"
    },
    {
        "path_max": 3,
        "path": "[By03, Bx03]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cx01, Cy01]"
    },
    {
        "path_max": 17,
        "path": "[Ay01, Ax01, Ay01]"
    },
    {
        "path_max": 3,
        "path": "[Cz02, Cz01]"
    },
    {
        "path_max": 45,
        "path": "[Cz02]"
    },
    {
        "path_max": 2,
        "path": "[Az01, Bx02]"
    },
    {
        "path_max": 4,
        "path": "[Cx02, Cy03, Cx02]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Ax03, Cx03]"
    },
    {
        "path_max": 4,
        "path": "[Hy03, Hx02]"
    },
    {
        "path_max": 3,
        "path": "[Hx03, Hx02]"
    },
    {
        "path_max": 6,
        "path": "[Hy02, Hx03]"
    },
    {
        "path_max": 5,
        "path": "[Hz02, Kx01]"
    },
    {
        "path_max": 5,
        "path": "[Bx01, Bx02]"
    },
    {
        "path_max": 3,
        "path": "[Ax01, Ay03, Ay01]"
    },
    {
        "path_max": 4,
        "path": "[Ax01, By03]"
    },
    {
        "path_max": 4,
        "path": "[Ax02, By02]"
    },
    {
        "path_max": 45,
        "path": "[Hz02]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Ax03]"
    },
    {
        "path_max": 20,
        "path": "[Cy02, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Ax03, Ay01, Ay02]"
    },
    {
        "path_max": 3,
        "path": "[Cy01, Cz01, Cy01]"
    },
    {
        "path_max": 4,
        "path": "[Cx01, Jx02]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, Ay03, By03]"
    },
    {
        "path_max": 5,
        "path": "[Bx01, Bz02]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Az00, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Hy01, Hx01]"
    },
    {
        "path_max": 9,
        "path": "[Cz01, Cy01]"
    },
    {
        "path_max": 6,
        "path": "[Cx02, Cx03, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Kx03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Kx03]"
    },
    {
        "path_max": 2,
        "path": "[Kx02, Kz01]"
    },
    {
        "path_max": 4,
        "path": "[Cz01, Cx03]"
    },
    {
        "path_max": 11,
        "path": "[Az02, Ay02]"
    },
    {
        "path_max": 9,
        "path": "[Cy03, Cz00]"
    },
    {
        "path_max": 3,
        "path": "[Cx02, Cy01, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Ax03]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cy02]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Cy03]"
    },
    {
        "path_max": 10,
        "path": "[Cx03, Ax03, Cx03]"
    },
    {
        "path_max": 3,
        "path": "[Ax01, Bx02, Bx03]"
    },
    {
        "path_max": 2,
        "path": "[Bx03, By01]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ay01]"
    },
    {
        "path_max": 5,
        "path": "[Cy02, Cx01]"
    },
    {
        "path_max": 6,
        "path": "[Ax03, By01]"
    },
    {
        "path_max": 45,
        "path": "[Cz00]"
    },
    {
        "path_max": 4,
        "path": "[Hy03, By02]"
    },
    {
        "path_max": 22,
        "path": "[Jx02]"
    },
    {
        "path_max": 2,
        "path": "[Cx01, Cy01, Cz02]"
    },
    {
        "path_max": 3,
        "path": "[Cy02, Cz00, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, Cy02, Cy03]"
    },
    {
        "path_max": 19,
        "path": "[Kz00]"
    },
    {
        "path_max": 9,
        "path": "[Az01, Ay03]"
    },
    {
        "path_max": 9,
        "path": "[Ax02, Ax01, Ax03]"
    },
    {
        "path_max": 4,
        "path": "[Hy03, Hy03]"
    },
    {
        "path_max": 14,
        "path": "[Ay01, Ax02, Ay01]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Cx03]"
    },
    {
        "path_max": 3,
        "path": "[Az02, Ay02, Az02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Cy02]"
    },
    {
        "path_max": 4,
        "path": "[Az01, Ay03, Az01]"
    },
    {
        "path_max": 10,
        "path": "[Ax02, Az00]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ay01, Az01]"
    },
    {
        "path_max": 3,
        "path": "[Hx02, Ky03]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ay01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cy01]"
    },
    {
        "path_max": 45,
        "path": "[Hz00]"
    },
    {
        "path_max": 9,
        "path": "[Cy03, Cx02, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cz01, Cy03]"
    },
    {
        "path_max": 4,
        "path": "[Ax02, Ay02, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cy01, Cx03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ax02]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ay01]"
    },
    {
        "path_max": 2,
        "path": "[Cx01, Ax01, Cy02]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Cx02, Ay02]"
    },
    {
        "path_max": 4,
        "path": "[Hy02, Kx01]"
    },
    {
        "path_max": 6,
        "path": "[Cz02, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Az02]"
    },
    {
        "path_max": 2,
        "path": "[Cx02, Cy03, Cx03]"
    },
    {
        "path_max": 2,
        "path": "[Cx03, Cx01, Cx02]"
    },
    {
        "path_max": 2,
        "path": "[Ax01, Bz02]"
    },
    {
        "path_max": 2,
        "path": "[Ax01, Ax02, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Ay02, Ax01, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Hx03]"
    },
    {
        "path_max": 3,
        "path": "[Jx03]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx01]"
    },
    {
        "path_max": 6,
        "path": "[Cz00, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Ky02, Kz01]"
    },
    {
        "path_max": 3,
        "path": "[Ay03, Bz00]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Az01]"
    },
    {
        "path_max": 7,
        "path": "[Hy02, Bx01]"
    },
    {
        "path_max": 6,
        "path": "[Bz02, Bx01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Bx03]"
    },
    {
        "path_max": 3,
        "path": "[Cx03, Cz02, Cx03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ay02]"
    },
    {
        "path_max": 3,
        "path": "[Ky02, Ky03]"
    },
    {
        "path_max": 37,
        "path": "[Ay03, Ax02, Ay03]"
    },
    {
        "path_max": 33,
        "path": "[Az01, Az02]"
    },
    {
        "path_max": 4,
        "path": "[Hy02, Ky03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Kx01]"
    },
    {
        "path_max": 5,
        "path": "[Cz00, Cy03]"
    },
    {
        "path_max": 3,
        "path": "[Ay03, Az01, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Ax03, Ax01, Ay01]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, By03]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Ay03]"
    },
    {
        "path_max": 7,
        "path": "[Cy02, Cx02, Cy02]"
    },
    {
        "path_max": 16,
        "path": "[Az00, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Ay03]"
    },
    {
        "path_max": 4,
        "path": "[Hx01, Hy03]"
    },
    {
        "path_max": 2,
        "path": "[Hx01, Hy03]"
    },
    {
        "path_max": 4,
        "path": "[Cz01, Cx03]"
    },
    {
        "path_max": 3,
        "path": "[Cx01, Az00, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Cx01, Ax02, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Az01]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, By01]"
    },
    {
        "path_max": 7,
        "path": "[Cy03, Cz01]"
    },
    {
        "path_max": 2,
        "path": "[Cz01, Ky01]"
    },
    {
        "path_max": 2,
        "path": "[Hy03, Bx02, By03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Cy01, Ay01]"
    },
    {
        "path_max": 2,
        "path": "[Cx03, Ax03, Cx03]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Hy03]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Ax01, Ax02, Ax03]"
    },
    {
        "path_max": 3,
        "path": "[Hx02, Hx03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cz01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cy01]"
    },
    {
        "path_max": 18,
        "path": "[Ay01, Az02]"
    },
    {
        "path_max": 2,
        "path": "[Ay01, Bx03]"
    },
    {
        "path_max": 5,
        "path": "[Bx02, Bx01]"
    },
    {
        "path_max": 15,
        "path": "[Ax03, Hx03]"
    },
    {
        "path_max": 9,
        "path": "[Ay01, Ax03, Ay01]"
    },
    {
        "path_max": 2,
        "path": "[Ay02, By03]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, By01]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ay02]"
    },
    {
        "path_max": 6,
        "path": "[Hy03, Hy01]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Ax02, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Kx02, Ky03]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, Kx03, Kx01]"
    },
    {
        "path_max": 5,
        "path": "[Bx01, Bx03]"
    },
    {
        "path_max": 10,
        "path": "[Jy02]"
    },
    {
        "path_max": 11,
        "path": "[By02, By03]"
    },
    {
        "path_max": 22,
        "path": "[Hx01, Hx02]"
    },
    {
        "path_max": 4,
        "path": "[Cx01, Cz02, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ax03]"
    },
    {
        "path_max": 6,
        "path": "[Ay01, Ay02, Ay03]"
    },
    {
        "path_max": 9,
        "path": "[Ay02, By03]"
    },
    {
        "path_max": 2,
        "path": "[Ax01, Ax02, Ay01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cx03]"
    },
    {
        "path_max": 3,
        "path": "[Bx02, Bx03, Bx01]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Bx02, Bz01]"
    },
    {
        "path_max": 6,
        "path": "[Hx03, Hy01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ax03]"
    },
    {
        "path_max": 4,
        "path": "[Ay02, Kz02]"
    },
    {
        "path_max": 3,
        "path": "[Hy03, Hx03]"
    },
    {
        "path_max": 7,
        "path": "[Cy03, Cx03, Cy03]"
    },
    {
        "path_max": 3,
        "path": "[Az01, Ax03, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Az00, Az02, Az00]"
    },
    {
        "path_max": 7,
        "path": "[Cx03, Cy01, Cx03]"
    },
    {
        "path_max": 5,
        "path": "[Hx02, By03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cy02]"
    },
    {
        "path_max": 8,
        "path": "[Ax02, By03]"
    },
    {
        "path_max": 4,
        "path": "[Ax01, Ax02, Ay03]"
    },
    {
        "path_max": 6,
        "path": "[Hz01, By01]"
    },
    {
        "path_max": 10,
        "path": "[Cy02, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Bz01]"
    },
    {
        "path_max": 6,
        "path": "[Az00, Az01, Az02]"
    },
    {
        "path_max": 5,
        "path": "[Ay02, Cx01]"
    },
    {
        "path_max": 21,
        "path": "[Cz00, Cz01]"
    },
    {
        "path_max": 6,
        "path": "[Ay02, Bx02]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Cx03]"
    },
    {
        "path_max": 6,
        "path": "[Hy03, Bz00]"
    },
    {
        "path_max": 7,
        "path": "[Bz00, By03]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Cy01]"
    },
    {
        "path_max": 4,
        "path": "[Ay03, Az00]"
    },
    {
        "path_max": 4,
        "path": "[Az01, Ax02, Az01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cx03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ay02]"
    },
    {
        "path_max": 2,
        "path": "[Bx03, Bx01]"
    },
    {
        "path_max": 21,
        "path": "[Jy03]"
    },
    {
        "path_max": 7,
        "path": "[Hx01, Ax01, Hx01]"
    },
    {
        "path_max": 12,
        "path": "[Cy03, Cx01, Cy03]"
    },
    {
        "path_max": 6,
        "path": "[Ay01, Ax02, Ay02]"
    },
    {
        "path_max": 2,
        "path": "[Az00, Ay03, Az00]"
    },
    {
        "path_max": 45,
        "path": "[Hy03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cx01]"
    },
    {
        "path_max": 45,
        "path": "[Ky03]"
    },
    {
        "path_max": 2,
        "path": "[Bz01, Bx03]"
    },
    {
        "path_max": 3,
        "path": "[Cx01, Az00]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Ay03, Ax03]"
    },
    {
        "path_max": 4,
        "path": "[By02, Bz02]"
    },
    {
        "path_max": 7,
        "path": "[Bz01, Bx03]"
    },
    {
        "path_max": 4,
        "path": "[Cy03, Ax03, Cy03]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, Ay03, Ax02, Ax03]"
    },
    {
        "path_max": 40,
        "path": "[Ay02, Ax01, Ay02]"
    },
    {
        "path_max": 3,
        "path": "[Az01, Ax03, Az01]"
    },
    {
        "path_max": 10,
        "path": "[Az02, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Cy02, Cy03, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Ax03, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Jx02, Jy03]"
    },
    {
        "path_max": 6,
        "path": "[Cx03, Cz01]"
    },
    {
        "path_max": 4,
        "path": "[Ax03, By02]"
    },
    {
        "path_max": 4,
        "path": "[Cz00, Cx02, Cz00]"
    },
    {
        "path_max": 4,
        "path": "[Ay02, Ay03, Ay01]"
    },
    {
        "path_max": 4,
        "path": "[Cy01, Cx03, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Ay02]"
    },
    {
        "path_max": 3,
        "path": "[Ax01, Ax02, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Cx01, Cy02]"
    },
    {
        "path_max": 5,
        "path": "[Ay02, Kx02]"
    },
    {
        "path_max": 13,
        "path": "[Ay03, Ax03, Ay03]"
    },
    {
        "path_max": 45,
        "path": "[By02]"
    },
    {
        "path_max": 4,
        "path": "[Cx02, Cz01, Cx02]"
    },
    {
        "path_max": 3,
        "path": "[Ay02, Cy02, Ay02]"
    },
    {
        "path_max": 5,
        "path": "[Cy02, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[By01, Bx03]"
    },
    {
        "path_max": 2,
        "path": "[Cx01, Ax01, Cx01, Cx02]"
    },
    {
        "path_max": 3,
        "path": "[Cy03, Ay03]"
    },
    {
        "path_max": 45,
        "path": "[Ky01]"
    },
    {
        "path_max": 14,
        "path": "[Cy01, Cx01, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Ay02, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Cy02, Bx02]"
    },
    {
        "path_max": 2,
        "path": "[Ax01, Ax02, Az01]"
    },
    {
        "path_max": 5,
        "path": "[Hy01, Ky02]"
    },
    {
        "path_max": 4,
        "path": "[Cy02, Cx03, Cy02]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Kx03, Ky03]"
    },
    {
        "path_max": 4,
        "path": "[Bx01, By01]"
    },
    {
        "path_max": 8,
        "path": "[Cz02, Cy01]"
    },
    {
        "path_max": 15,
        "path": "[Cy02, Cz02]"
    },
    {
        "path_max": 12,
        "path": "[ABz00, Bx01]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ay02, Az02]"
    },
    {
        "path_max": 2,
        "path": "[Hy01, Hx02]"
    },
    {
        "path_max": 2,
        "path": "[Az02, Ax01, Az00]"
    },
    {
        "path_max": 2,
        "path": "[Bz01, By02]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Ay03, Ay01]"
    },
    {
        "path_max": 5,
        "path": "[Ay02, Ay03]"
    },
    {
        "path_max": 9,
        "path": "[Jz02]"
    },
    {
        "path_max": 8,
        "path": "[Ax01, Cx01, Ax01, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ax03]"
    },
    {
        "path_max": 2,
        "path": "[Ay03, Az00, Ay03]"
    },
    {
        "path_max": 4,
        "path": "[Hx03, Hy01]"
    },
    {
        "path_max": 3,
        "path": "[Bx01, Bz00]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Bx03, By02]"
    },
    {
        "path_max": 3,
        "path": "[Cx03, Kx01]"
    },
    {
        "path_max": 2,
        "path": "[Cz02, Cy02, Cz02]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, By03]"
    },
    {
        "path_max": 6,
        "path": "[Cx02, Cy02, Cx02]"
    },
    {
        "path_max": 9,
        "path": "[Ax03, Ax01, Ax03]"
    },
    {
        "path_max": 14,
        "path": "[Az01, Ay01]"
    },
    {
        "path_max": 5,
        "path": "[Hy03, Hx03]"
    },
    {
        "path_max": 3,
        "path": "[Hx01, Hx02, Hx03]"
    },
    {
        "path_max": 2,
        "path": "[Cx02, Cy02, Cz01]"
    },
    {
        "path_max": 3,
        "path": "[Cy03, Cy03, Cy01]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, By03]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Bx02]"
    },
    {
        "path_max": 10,
        "path": "[Az00, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Hx02, Hy03]"
    },
    {
        "path_max": 6,
        "path": "[Bx01, Bx01, Bx01]"
    },
    {
        "path_max": 2,
        "path": "[Az01, Ay01, Az01]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ay03, Az01]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Cy01, Cx03]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Cx02, Cx03]"
    },
    {
        "path_max": 2,
        "path": "[Az00, Ax01, Az00]"
    },
    {
        "path_max": 5,
        "path": "[Bx03, Bx01]"
    },
    {
        "path_max": 2,
        "path": "[Cz02, Cy01, Cz02]"
    },
    {
        "path_max": 3,
        "path": "[Cy02, Cz00, Cy02]"
    },
    {
        "path_max": 15,
        "path": "[Jx01]"
    },
    {
        "path_max": 45,
        "path": "[By03]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cx03, Ax03, Cx03]"
    },
    {
        "path_max": 6,
        "path": "[Az01, Ax03]"
    },
    {
        "path_max": 10,
        "path": "[Ay03, Az00]"
    },
    {
        "path_max": 2,
        "path": "[Cx03, Cy03, Cy01]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ky03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ax03]"
    },
    {
        "path_max": 3,
        "path": "[Bz02, By01]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Bx02, By03]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Cy01]"
    },
    {
        "path_max": 9,
        "path": "[Cy01, Cz00]"
    },
    {
        "path_max": 4,
        "path": "[Ax01, Ay01, Ay02]"
    },
    {
        "path_max": 3,
        "path": "[By03, By03]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cz02]"
    },
    {
        "path_max": 4,
        "path": "[Ay01, By01]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cz01]"
    },
    {
        "path_max": 2,
        "path": "[Bz00, By03]"
    },
    {
        "path_max": 13,
        "path": "[Hy02, Hx01]"
    },
    {
        "path_max": 3,
        "path": "[Bx03, Bz01]"
    },
    {
        "path_max": 5,
        "path": "[Cz01, Cy02]"
    },
    {
        "path_max": 3,
        "path": "[Ax01, By01]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cz01, Cy03]"
    },
    {
        "path_max": 4,
        "path": "[Az01, Az00]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Ay01]"
    },
    {
        "path_max": 3,
        "path": "[Az01, Ay02]"
    },
    {
        "path_max": 2,
        "path": "[Cx03, Ax01, Cx01]"
    },
    {
        "path_max": 38,
        "path": "[Cy01, Cy02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Az02]"
    },
    {
        "path_max": 12,
        "path": "[Jz00]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Bx03]"
    },
    {
        "path_max": 15,
        "path": "[Ay01, Ay02, Ay03]"
    },
    {
        "path_max": 9,
        "path": "[Hx03, Ax03, Hx03]"
    },
    {
        "path_max": 11,
        "path": "[Cx01, Cz00]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Kx01]"
    },
    {
        "path_max": 5,
        "path": "[Hx02, Kx03]"
    },
    {
        "path_max": 2,
        "path": "[Hy01, Hx03]"
    },
    {
        "path_max": 2,
        "path": "[Cz00, Cy02, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Cx01]"
    },
    {
        "path_max": 2,
        "path": "[Az00, Ay03, Ax03]"
    },
    {
        "path_max": 13,
        "path": "[Cx03, Cy03, Cx03]"
    },
    {
        "path_max": 2,
        "path": "[Cz02, Ky01]"
    },
    {
        "path_max": 2,
        "path": "[Ax03, Ay02, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Az02, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Ax01, Ax03]"
    },
    {
        "path_max": 5,
        "path": "[Cy01, Cx01]"
    },
    {
        "path_max": 45,
        "path": "[Bz02]"
    },
    {
        "path_max": 4,
        "path": "[Hy02, Hy03]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cy02]"
    },
    {
        "path_max": 2,
        "path": "[Hx03, Ax03]"
    },
    {
        "path_max": 4,
        "path": "[Ax01, Bz00]"
    },
    {
        "path_max": 7,
        "path": "[Cz00, Cy03]"
    },
    {
        "path_max": 9,
        "path": "[Jx03]"
    },
    {
        "path_max": 8,
        "path": "[Bz02, Bx03]"
    },
    {
        "path_max": 5,
        "path": "[Kx03, Kx01]"
    },
    {
        "path_max": 16,
        "path": "[Az00, Az01]"
    },
    {
        "path_max": 2,
        "path": "[Ay01, Ay03, Ay01]"
    },
    {
        "path_max": 15,
        "path": "[Ay03, Ax01, Ay03]"
    },
    {
        "path_max": 11,
        "path": "[Ax01, Az00]"
    },
    {
        "path_max": 45,
        "path": "[Hy01]"
    },
    {
        "path_max": 11,
        "path": "[Kz01]"
    },
    {
        "path_max": 8,
        "path": "[Cy01, Cz01]"
    },
    {
        "path_max": 9,
        "path": "[Cz00, Cx02]"
    },
    {
        "path_max": 8,
        "path": "[Cy03, Cy01, Cy02]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Ay02]"
    },
    {
        "path_max": 22,
        "path": "[Cx02, Ax02, Cx02]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[By03, Bx01]"
    },
    {
        "path_max": 5,
        "path": "[Ax02, Hx02]"
    },
    {
        "path_max": 4,
        "path": "[Hy03, Ky03]"
    },
    {
        "path_max": 2,
        "path": "[Cy02, Ax01, Cy03]"
    },
    {
        "path_max": 2,
        "path": "[Cz01, Cx02, Cy03]"
    },
    {
        "path_max": 3,
        "path": "[Cy01, Cx02, Cy01]"
    },
    {
        "path_max": 3,
        "path": "[Cz01, Cy01, Cx03]"
    },
    {
        "path_max": 2,
        "path": "[Ay02, Ax01, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ax02, Ax03]"
    },
    {
        "path_max": 5,
        "path": "[Ay02, Cx02]"
    },
    {
        "path_max": 2,
        "path": "[Hx01, Ky02]"
    },
    {
        "path_max": 2,
        "path": "[Cx02, Cy03, Cx02]"
    },
    {
        "path_max": 24,
        "path": "[By01, By02]"
    },
    {
        "path_max": 14,
        "path": "[Ay03, Az01]"
    },
    {
        "path_max": 10,
        "path": "[Ay02, Az02]"
    },
    {
        "path_max": 3,
        "path": "[Cz00, Cz02]"
    },
    {
        "path_max": 2,
        "path": "[Az01, Ay02, Az01]"
    },
    {
        "path_max": 45,
        "path": "[Bz00]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Az01]"
    },
    {
        "path_max": 4,
        "path": "[Cz02, Cx03]"
    },
    {
        "path_max": 3,
        "path": "[Az02, Ax01, Az02]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Kx01]"
    },
    {
        "path_max": 4,
        "path": "[Hz02, Ky01]"
    },
    {
        "path_max": 5,
        "path": "[Ay03, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Hx03, Ax03, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Ay01]"
    },
    {
        "path_max": 4,
        "path": "[Hz00, Kx02]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Az01, Ay01]"
    },
    {
        "path_max": 2,
        "path": "[By03, Bx02, By03]"
    },
    {
        "path_max": 7,
        "path": "[Ay03, Ax01, Ay01]"
    },
    {
        "path_max": 3,
        "path": "[Cx01, Cx02, Cx01]"
    },
    {
        "path_max": 5,
        "path": "[Ay01, Ax03]"
    },
    {
        "path_max": 5,
        "path": "[Cy02, Cx03]"
    },
    {
        "path_max": 6,
        "path": "[Ax01, Ay03, Ay03]"
    },
    {
        "path_max": 2,
        "path": "[Cy01, Cx01, Cy02]"
    },
    {
        "path_max": 45,
        "path": "[Cz01]"
    },
    {
        "path_max": 2,
        "path": "[Ax02, Cz02]"
    },
    {
        "path_max": 5,
        "path": "[Cx02, Cx03]"
    },
    {
        "path_max": 7,
        "path": "[Bx01, By02]"
    },
    {
        "path_max": 2,
        "path": "[Ay01, Az00]"
    },
    {
        "path_max": 4,
        "path": "[Bz00, Bx02]"
    },
    {
        "path_max": 9,
        "path": "[Hx03, Hy02]"
    },
    {
        "path_max": 2,
        "path": "[Hx02, Hx01, Hx02]"
    },
    {
        "path_max": 14,
        "path": "[Jy03]"
    },
    {
        "path_max": 5,
        "path": "[Cy03, Cx02, Cy03]"
    },
    {
        "path_max": 5,
        "path": "[Ax03, Cx01]"
    },
    {
        "path_max": 3,
        "path": "[Ay03, Ax01, Ay03]"
    },
    {
        "path_max": 5,
        "path": "[Cx03, Cy03]"
    },
    {
        "path_max": 21,
        "path": "[Cy03, Cy03]"
    },
    {
        "path_max": 3,
        "path": "[Ax02, Ax03, Ay03]"
    },
    {
        "path_max": 3,
        "path": "[Ay02, Ax03, Ay03]"
    },
    {
        "path_max": 7,
        "path": "[Hy03, Hx01]"
    },
    {
        "path_max": 22,
        "path": "[Ay02, Ax02, Ay02]"
    },
    {
        "path_max": 2,
        "path": "[Cy03, Cy01, Cy02]"
    },
    {
        "path_max": 2,
        "path": "[Ax01, Ky02]"
    },
    {
        "path_max": 9,
        "path": "[Ay03, Az01]"
    },
    {
        "path_max": 45,
        "path": "[Hz01]"
    },
    {
        "path_max": 4,
        "path": "[By03, Bx02]"
    }
]
