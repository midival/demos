import React from "react"
import { MPEInputZone } from "../../../../core/src/mpe/input/MPEInputZone"
import "./styles.css"

interface Props {
    lowerZone?: MPEInputZone,
    upperZone?: MPEInputZone
}

interface ZoneDisplayProps {
    isUpper: boolean;
    zone: MPEInputZone;
}

const ZoneDisplay = ({ zone, isUpper }: ZoneDisplayProps) => {
    return <div className="zone-display">
        {!isUpper && <div className="master-channel"></div>}
        <div className="child-zones" style={{
            "--count": zone.memberChannelRange[1] - zone.memberChannelRange[0] + 1,
            "--offset": isUpper ? 16 - 2 - (zone.memberChannelRange[1] - zone.memberChannelRange[0]) : 0
        }}></div>
        {isUpper && <div className="master-channel"></div>}
    </div>
}

export const ChannelVisualizer = ({ lowerZone, upperZone }: Props) => {
    return <div className="channel-visualizer">
        <div className="header">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
        </div>
        {lowerZone && <ZoneDisplay zone={lowerZone} isUpper={false} />}
        {upperZone && <ZoneDisplay zone={upperZone} isUpper={true} />}
    </div>
}