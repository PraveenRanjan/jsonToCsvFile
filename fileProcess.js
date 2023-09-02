const fs = require('fs');

const folderPath = "D:/otherProject/share_files/";
const outputFolder = "D:/otherProject/share_files/csv";



async function readFile() {
    console.log("calling readfile---")
    try {
        await fs.readdirSync(folderPath).map(fileName => {
            // return path.join(folderPath, fileName);
            console.log("file name:: ", fileName);
            try {
                const data = fs.readFileSync(`${folderPath}/${fileName}`, 'utf8');
                // console.log("data--> ", data);
                const jsonData = JSON.parse(data);
                const keys = Object.keys(jsonData);
                

                const filteredData = jsonData[keys[0]]?.response_json.data.filter(el => {
                    const mcap = el.d[17];
                    return mcap > 1000000000 && mcap < 500000000000
                });

                const result = filteredData?.map(fd => fd.s);
                console.log("result::-> ", result.join(","));
                const content = result.join("\n");
                const newFileName = fileName.replace('.txt', '.csv');
                console.log("newFileName--> ",newFileName);
                fs.writeFile(`${outputFolder}/${newFileName}`, content, err => {
                    if (err) {
                      console.error(err);
                    }
                });

            } catch (err) {
                console.error(err);
            }
        });

        // const data = await fs.readFile('D:/otherProject/share_files/AIR_FREIGHT-COURIERS.txt', { encoding: 'utf8' });

        // const jsonData = JSON.parse(data);

        // const filteredData = jsonData.rAjeOR?.response_json.data.filter(el => {
        //     const mcap = el.d[17];        
        //     return mcap > 1000000000 && mcap < 500000000000
        // });

        // const result = filteredData.map(fd => {
        //     return {
        //         name: fd.s,
        //         mcap: fd.d[17]
        //     }
        // });

        // console.log('result: ', result);


    } catch (err) {
        console.log(err);
    }
}


// example();

module.exports = {
    readFile
} 