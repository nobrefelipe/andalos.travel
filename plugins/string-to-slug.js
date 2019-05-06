import Vue from 'vue'

Vue.mixin({
    methods: {

        string_to_slug (str) {

            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();

            // remove accents, swap ñ for n, etc
            var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to   = "aaaaaeeeeiiiioooouuuunc------";

            for (var i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            console.log(str)
            return str;

        },


        getSiblings (elem) {

            // Setup siblings array and get the first sibling
            var siblings = [];
            var sibling = elem.parentNode.firstChild;

            // Loop through each sibling and push to the array
            while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                    siblings.push(sibling);
                }
                sibling = sibling.nextSibling
            }

            return siblings;

        }
    }
})

