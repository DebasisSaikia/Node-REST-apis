const bar = () => console.log('bar');
const baz = () => console.log('baz');

const foo = () => {
    console.log('foo');
    baz()
    bar();
}

foo()