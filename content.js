async function fetchData(link){
    const res = await fetch(link)
    const data = await res.json();
    const hasSolved = data.badgesData.hasUserSolvedTheProblem
    return hasSolved ;
}
function injectImg(){
    const targetTable = document.getElementsByClassName('dataTable');
    if(targetTable){
        console.log("Yes Found")
        const waitForTable = setInterval(() => {
            const tables = document.querySelectorAll('.dataTable');
            if (tables.length > 0) {
                clearInterval(waitForTable);
                let Question_ID = [];
                let vector = [];
                for(let i = 0 ; i<tables.length ; i++){
                    const rows = tables[i].querySelectorAll('tr');
                    for(let j = 1 ; j<rows.length ; j++){
                        vector.push(rows[j].querySelector('td > div > span'));
                        Question_ID.push(rows[j].querySelector('td:nth-of-type(2) > div').textContent);
                    }
                }
                (async() => {
                    for(let i = 0 ; i<vector.length ; i++){
                        if(vector[i].querySelector('img')){
                            vector[i].querySelector('img').remove();
                        }
                        let link = "https://www.codechef.com/api/user/badges/progress?problemCode="+Question_ID[i] ;
                        let ans = await fetchData(link);
                        if(ans===true){
                            const toInject = document.createElement('img');
                            toInject.className = 'icon-attempt';
                            toInject.src = '/sites/all/modules/codechef_tags/images/solved.png?v=1';
                            toInject.setAttribute('title', '100/100');
                            vector[i].querySelector('a').insertAdjacentElement('afterEnd',toInject);
                        }
                    }
                }) ();
            }
        }, 500);
    }
    else{
        console.log("Not Found");
    }
}
injectImg();