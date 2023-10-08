import PerfectScrollbar from 'react-perfect-scrollbar'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input } from "components/xbl";
import useToast from "hooks/useToast";

const QueriesSidebar = ({ values, onClose, access, onUpdate }) => {
    const dispatchToast = useToast();

    return (<div className="sidebar pf h100 t0 r0 ofh tr2 white z2000">
        <PerfectScrollbar>
            <div className="flex aic p50 p1-xl">
                <div onClick={onClose} className="ic40 ic ix-arrow rot90 graye br50 mbtn mr1" />
                <div className="bold">Customer query</div>
            </div>
            <div className="px1">
                <div>
                    <div className="f07 cgraya ttu bold">Name</div>
                    <div className="bold">{values.name}</div>
                </div>
                <div className="mt1 flex aic jcsb">
                    <div>
                        <div className="f07 cgraya ttu bold">Phone</div>
                        <div className="bold">{values.phone}</div>
                    </div>
                    <div className="flex aic jcsb">
                        <CopyToClipboard text={values.phone}
                            onCopy={() => dispatchToast("Copied")}>
                            <div className="ic40 hover-dark cp mr50 graye br50 ic ix-copy" />
                        </CopyToClipboard>
                        <a href={`tel:${values.phone}`} className="ic40 hover-dark cp mr50 graye br50 ic ix-call"> </a>
                        <a href={`https://api.whatsapp.com/send?phone=${values.phone}`} target="_blank" rel="noreferrer" className="ic40 hover-dark cp graye br50 ic ix-whatsapp"> </a>
                    </div>
                </div>
                <div className="mt1 flex aic jcsb">
                    <div>
                        <div className="f07 cgraya ttu bold">Email</div>
                        <div className="bold">{values.email}</div>
                    </div>
                    <div className="flex aic jcsb">
                        <CopyToClipboard text={values.email}
                            onCopy={() => dispatchToast("Copied")}>
                            <div className="ic40 hover-dark cp mr50 graye br50 ic ix-copy" />
                        </CopyToClipboard>
                        <a href={`mailto:${values.email}`} target="_blank" rel="noreferrer" className="ic40 hover-dark cp mr50 graye br50 ic ix-email"> </a>
                    </div>
                </div>
                <div className="mt1">
                    <div className="f07 cgraya ttu bold">Message</div>
                    <div className="bold" dangerouslySetInnerHTML={{ __html: values.message }} />
                </div>

                {
                    // visible only for access >= 2
                    access >= 2 && !values.resolved && <div className="flex jcsb p1 pa b0 l0 w100">
                        <span>Mark resolved</span>
                        <span>
                            <Input
                                type="switch"
                                // checked={values.resolved}
                                onChange={(e) => onUpdate(values.id, e.target.checked)}
                            />
                        </span>
                    </div>
                }


            </div>
        </PerfectScrollbar>
    </div>);
}
export default QueriesSidebar;

